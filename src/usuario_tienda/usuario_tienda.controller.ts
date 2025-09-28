import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioTiendaService } from './usuario_tienda.service';
import { CreateUsuarioTiendaDto } from './dto/create-usuario_tienda.dto';
import { UpdateUsuarioTiendaDto } from './dto/update-usuario_tienda.dto';

@Controller('usuario-tienda')
export class UsuarioTiendaController {
  constructor(private readonly usuarioTiendaService: UsuarioTiendaService) {}

  @Post()
  create(@Body() createUsuarioTiendaDto: CreateUsuarioTiendaDto) {
    return this.usuarioTiendaService.create(createUsuarioTiendaDto);
  }

  @Get()
  findAll() {
    return this.usuarioTiendaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioTiendaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioTiendaDto: UpdateUsuarioTiendaDto) {
    return this.usuarioTiendaService.update(+id, updateUsuarioTiendaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioTiendaService.remove(+id);
  }
}
