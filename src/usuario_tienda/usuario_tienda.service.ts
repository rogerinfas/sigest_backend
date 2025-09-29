import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioTienda } from './entities/usuario_tienda.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Tienda } from '../tiendas/entities/tienda.entity';
import { CreateUsuarioTiendaDto } from './dto/create-usuario_tienda.dto';
import { UpdateUsuarioTiendaDto } from './dto/update-usuario_tienda.dto';
import { UsuarioTiendaResponseDto } from './dto/usuario-tienda-response.dto';
import { PaginationParamsDto } from '../common/dto/pagination-params.dto';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';

@Injectable()
export class UsuarioTiendaService {
  constructor(
    @InjectRepository(UsuarioTienda)
    private readonly usuarioTiendaRepository: Repository<UsuarioTienda>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Tienda)
    private readonly tiendaRepository: Repository<Tienda>,
  ) {}

  async create(createUsuarioTiendaDto: CreateUsuarioTiendaDto): Promise<UsuarioTiendaResponseDto> {
    // Verificar que el usuario existe
    const usuario = await this.usuarioRepository.findOne({ where: { id: createUsuarioTiendaDto.usuarioId } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    // Verificar que la tienda existe
    const tienda = await this.tiendaRepository.findOne({ where: { id: createUsuarioTiendaDto.tiendaId } });
    if (!tienda) throw new NotFoundException('Tienda no encontrada');

    // Verificar que no existe la relación ya
    const existe = await this.usuarioTiendaRepository.findOne({
      where: {
        usuario: { id: createUsuarioTiendaDto.usuarioId },
        tienda: { id: createUsuarioTiendaDto.tiendaId }
      }
    });
    if (existe) throw new ConflictException('Ya existe esta asignación usuario-tienda');

    const usuarioTienda = this.usuarioTiendaRepository.create({
      usuario: { id: createUsuarioTiendaDto.usuarioId } as Usuario,
      tienda: { id: createUsuarioTiendaDto.tiendaId } as Tienda
    });

    const savedUsuarioTienda = await this.usuarioTiendaRepository.save(usuarioTienda);
    return this.toResponseDto(savedUsuarioTienda);
  }

  async findAll(pagination: PaginationParamsDto): Promise<PaginatedResult<UsuarioTiendaResponseDto>> {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
    
    const [data, total] = await this.usuarioTiendaRepository.findAndCount({
      relations: ['usuario', 'tienda'],
      order: { id: 'DESC' },
      skip,
      take: limit
    });

    const totalPages = Math.ceil(total / limit);
    
    return {
      data: data.map(usuarioTienda => this.toResponseDto(usuarioTienda)),
      pagination: {
        current_page: page,
        total_pages: totalPages,
        next_page: page < totalPages ? page + 1 : null,
        prev_page: page > 1 ? page - 1 : null
      }
    };
  }

  async findOne(id: number): Promise<UsuarioTiendaResponseDto> {
    const usuarioTienda = await this.usuarioTiendaRepository.findOne({ 
      where: { id },
      relations: ['usuario', 'tienda']
    });
    if (!usuarioTienda) throw new NotFoundException('Asignación usuario-tienda no encontrada');
    return this.toResponseDto(usuarioTienda);
  }

  async update(id: number, updateUsuarioTiendaDto: UpdateUsuarioTiendaDto): Promise<UsuarioTiendaResponseDto> {
    const usuarioTienda = await this.usuarioTiendaRepository.findOne({ 
      where: { id },
      relations: ['usuario', 'tienda']
    });
    if (!usuarioTienda) throw new NotFoundException('Asignación usuario-tienda no encontrada');

    // Si se actualiza usuarioId, verificar que existe
    if (updateUsuarioTiendaDto.usuarioId) {
      const usuario = await this.usuarioRepository.findOne({ where: { id: updateUsuarioTiendaDto.usuarioId } });
      const tienda = usuarioTienda.tienda;
      
      if (!usuario) throw new NotFoundException('Usuario no encontrado');
      
      // Verificar que no existe la nueva combinación
      const existe = await this.usuarioTiendaRepository.findOne({
        where: {
          usuario: { id: updateUsuarioTiendaDto.usuarioId },
          tienda: { id: tienda.id }
        }
      });
      if (existe) throw new ConflictException('Ya existe esta asignación usuario-tienda');
      
      usuarioTienda.usuario = usuario;
    }

    // Si se actualiza tiendaId, verificar que existe
    if (updateUsuarioTiendaDto.tiendaId) {
      const tienda = await this.tiendaRepository.findOne({ where: { id: updateUsuarioTiendaDto.tiendaId } });
      const usuario = usuarioTienda.usuario;
      
      if (!tienda) throw new NotFoundException('Tienda no encontrada');
      
      // Verificar que no existe la nueva combinación
      const existe = await this.usuarioTiendaRepository.findOne({
        where: {
          usuario: { id: usuario.id },
          tienda: { id: updateUsuarioTiendaDto.tiendaId }
        }
      });
      if (existe) throw new ConflictException('Ya existe esta asignación usuario-tienda');
      
      usuarioTienda.tienda = tienda;
    }

    const savedUsuarioTienda = await this.usuarioTiendaRepository.save(usuarioTienda);
    return this.toResponseDto(savedUsuarioTienda);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usuarioTiendaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Asignación usuario-tienda no encontrada');
    }
  }

  private toResponseDto(usuarioTienda: UsuarioTienda): UsuarioTiendaResponseDto {
    return {
      id: usuarioTienda.id,
      usuario: usuarioTienda.usuario,
      tienda: usuarioTienda.tienda,
      fechaAsignacion: usuarioTienda.fechaAsignacion
    };
  }
}
