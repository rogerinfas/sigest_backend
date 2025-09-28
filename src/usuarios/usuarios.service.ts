import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioResponseDto } from './dto/usuario-response.dto';
import { PaginationParamsDto } from '../common/dto/pagination-params.dto';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioResponseDto> {
    const existe = await this.usuarioRepository.findOne({ where: { username: createUsuarioDto.username } });
    if (existe) throw new ConflictException('Ya existe un usuario con este nombre de usuario');
    
    // Hash de la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUsuarioDto.passwordHash, saltRounds);
    
    const usuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      passwordHash: hashedPassword
    });
    
    const savedUsuario = await this.usuarioRepository.save(usuario);
    return this.toResponseDto(savedUsuario);
  }

  async findAll(pagination: PaginationParamsDto): Promise<PaginatedResult<UsuarioResponseDto>> {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
    
    const [data, total] = await this.usuarioRepository.findAndCount({
      order: { id: 'DESC' },
      skip,
      take: limit
    });

    const totalPages = Math.ceil(total / limit);
    
    return {
      data: data.map(usuario => this.toResponseDto(usuario)),
      pagination: {
        current_page: page,
        total_pages: totalPages,
        next_page: page < totalPages ? page + 1 : null,
        prev_page: page > 1 ? page - 1 : null
      }
    };
  }

  async findOne(id: number): Promise<UsuarioResponseDto> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return this.toResponseDto(usuario);
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<UsuarioResponseDto> {
    if (updateUsuarioDto.username) {
      const existe = await this.usuarioRepository.findOne({ 
        where: { 
          username: updateUsuarioDto.username,
          id: Not(id) // Asegura que no sea el mismo registro(excluye de busqueda)
        } 
      });
      if (existe) throw new ConflictException('Ya existe otro usuario con este nombre de usuario');
    }
    
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    
    // Si se actualiza la contraseña, hashearla
    if (updateUsuarioDto.passwordHash) {
      const saltRounds = 10;
      updateUsuarioDto.passwordHash = await bcrypt.hash(updateUsuarioDto.passwordHash, saltRounds);
    }
    
    Object.assign(usuario, updateUsuarioDto);
    const savedUsuario = await this.usuarioRepository.save(usuario);
    return this.toResponseDto(savedUsuario);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usuarioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  private toResponseDto(usuario: Usuario): UsuarioResponseDto {
    const { passwordHash, ...usuarioResponse } = usuario;
    return usuarioResponse as UsuarioResponseDto;
  }
}
