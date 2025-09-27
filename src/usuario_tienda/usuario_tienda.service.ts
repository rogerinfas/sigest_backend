import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioTiendaDto } from './dto/create-usuario_tienda.dto';
import { UpdateUsuarioTiendaDto } from './dto/update-usuario_tienda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioTienda } from './entities/usuario_tienda.entity';

@Injectable()
export class UsuarioTiendaService {
  constructor(
    @InjectRepository(UsuarioTienda)
    private readonly usuarioTiendaRepo: Repository<UsuarioTienda>,
  ) {}

  async create(dto: CreateUsuarioTiendaDto) {
    const entity = this.usuarioTiendaRepo.create({
      usuario: { id_usuario: dto.id_usuario } as any,
      tienda: { id_tienda: dto.id_tienda } as any,
    } as any);
    return await this.usuarioTiendaRepo.save(entity);
  }

  async findAll() {
    return await this.usuarioTiendaRepo.find({ relations: { usuario: true, tienda: true } });
  }

  async findOne(id: number) {
    const ut = await this.usuarioTiendaRepo.findOne({ where: { id_usuario_tienda: id }, relations: { usuario: true, tienda: true } });
    if (!ut) throw new NotFoundException('Usuario-Tienda no encontrado');
    return ut;
  }

  async update(id: number, dto: UpdateUsuarioTiendaDto) {
    const ut = await this.findOne(id);
    if ((dto as any).id_usuario) {
      (ut as any).usuario = { id_usuario: (dto as any).id_usuario } as any;
      delete (ut as any).id_usuario;
    }
    if ((dto as any).id_tienda) {
      (ut as any).tienda = { id_tienda: (dto as any).id_tienda } as any;
      delete (ut as any).id_tienda;
    }
    return await this.usuarioTiendaRepo.save(ut);
  }

  async remove(id: number) {
    const ut = await this.findOne(id);
    await this.usuarioTiendaRepo.remove(ut);
    return { deleted: true };
  }
}
