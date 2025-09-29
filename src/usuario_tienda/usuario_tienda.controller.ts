import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { UsuarioTiendaService } from './usuario_tienda.service';
import { CreateUsuarioTiendaDto } from './dto/create-usuario_tienda.dto';
import { UpdateUsuarioTiendaDto } from './dto/update-usuario_tienda.dto';
import { UsuarioTiendaResponseDto } from './dto/usuario-tienda-response.dto';
import { PaginationParamsDto } from '../common/dto/pagination-params.dto';

@Controller('usuario-tienda')
export class UsuarioTiendaController {
  constructor(private readonly usuarioTiendaService: UsuarioTiendaService) {}

  @Post()
  create(@Body() createUsuarioTiendaDto: CreateUsuarioTiendaDto): Promise<UsuarioTiendaResponseDto> {
    return this.usuarioTiendaService.create(createUsuarioTiendaDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationParamsDto) {
    return this.usuarioTiendaService.findAll(pagination);
  }

  @Get('tienda/:tiendaId')
  async findUsuariosByTienda(
    @Param('tiendaId', ParseIntPipe) tiendaId: number
  ) {
    return this.usuarioTiendaService.findUsuariosByTienda(tiendaId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UsuarioTiendaResponseDto> {
    return this.usuarioTiendaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateUsuarioTiendaDto: UpdateUsuarioTiendaDto
  ): Promise<UsuarioTiendaResponseDto> {
    return this.usuarioTiendaService.update(id, updateUsuarioTiendaDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usuarioTiendaService.remove(id);
  }
}
