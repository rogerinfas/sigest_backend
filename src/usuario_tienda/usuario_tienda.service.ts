import { Injectable } from '@nestjs/common';
import { CreateUsuarioTiendaDto } from './dto/create-usuario_tienda.dto';
import { UpdateUsuarioTiendaDto } from './dto/update-usuario_tienda.dto';

@Injectable()
export class UsuarioTiendaService {
  create(createUsuarioTiendaDto: CreateUsuarioTiendaDto) {
    return 'This action adds a new usuarioTienda';
  }

  findAll() {
    return `This action returns all usuarioTienda`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioTienda`;
  }

  update(id: number, updateUsuarioTiendaDto: UpdateUsuarioTiendaDto) {
    return `This action updates a #${id} usuarioTienda`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioTienda`;
  }
}
