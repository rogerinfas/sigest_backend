import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTiendaDto } from './dto/create-tienda.dto';
import { UpdateTiendaDto } from './dto/update-tienda.dto';
import { Tienda } from './entities/tienda.entity';

@Injectable()
export class TiendasService {
  constructor(
    @InjectRepository(Tienda)
    private readonly tiendaRepo: Repository<Tienda>,
  ) {}

  async create(createTiendaDto: CreateTiendaDto) {
    const entity = this.tiendaRepo.create(createTiendaDto as any);
    return await this.tiendaRepo.save(entity);
  }

  async findAll() {
    return await this.tiendaRepo.find();
  }

  async findOne(id: number) {
    const tienda = await this.tiendaRepo.findOne({ where: { id_tienda: id } });
    if (!tienda) throw new NotFoundException('Tienda no encontrada');
    return tienda;
  }

  async update(id: number, updateTiendaDto: UpdateTiendaDto) {
    const tienda = await this.findOne(id);
    Object.assign(tienda, updateTiendaDto);
    return await this.tiendaRepo.save(tienda);
  }

  async remove(id: number) {
    const tienda = await this.findOne(id);
    await this.tiendaRepo.remove(tienda);
    return { deleted: true };
  }
}
