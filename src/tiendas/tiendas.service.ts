import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Tienda } from './entities/tienda.entity';
import { CreateTiendaDto } from './dto/create-tienda.dto';
import { UpdateTiendaDto } from './dto/update-tienda.dto';
import { PaginationParamsDto } from '../common/dto/pagination-params.dto';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';

@Injectable()
export class TiendasService {
  constructor(
    @InjectRepository(Tienda)
    private readonly tiendaRepository: Repository<Tienda>,
  ) {}

  async create(createTiendaDto: CreateTiendaDto): Promise<Tienda> {
    const existe = await this.tiendaRepository.findOne({ where: { nombre: createTiendaDto.nombre } });
    if (existe) throw new ConflictException('Ya existe una tienda con este nombre');
    
    const tienda = this.tiendaRepository.create(createTiendaDto);
    return this.tiendaRepository.save(tienda);
  }

  async findAll(pagination: PaginationParamsDto): Promise<PaginatedResult<Tienda>> {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
    
    const [data, total] = await this.tiendaRepository.findAndCount({
      order: { id: 'DESC' },
      skip,
      take: limit
    });

    const totalPages = Math.ceil(total / limit);
    
    return {
      data,
      pagination: {
        current_page: page,
        total_pages: totalPages,
        next_page: page < totalPages ? page + 1 : null,
        prev_page: page > 1 ? page - 1 : null
      }
    };
  }

  async findOne(id: number): Promise<Tienda> {
    const tienda = await this.tiendaRepository.findOne({ where: { id } });
    if (!tienda) throw new NotFoundException('Tienda no encontrada');
    return tienda;
  }

  async update(id: number, updateTiendaDto: UpdateTiendaDto): Promise<Tienda> {
    if (updateTiendaDto.nombre) {
      const existe = await this.tiendaRepository.findOne({ 
        where: { 
          nombre: updateTiendaDto.nombre,
          id: Not(id) // Asegura que no sea el mismo registro(excluye de busqueda)
        } 
      });
      if (existe) throw new ConflictException('Ya existe otra tienda con este nombre');
    }
    
    const tienda = await this.findOne(id);
    Object.assign(tienda, updateTiendaDto);
    return this.tiendaRepository.save(tienda);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tiendaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Tienda no encontrada');
    }
  }
}
