import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { TiendasService } from './tiendas.service';
import { CreateTiendaDto } from './dto/create-tienda.dto';
import { UpdateTiendaDto } from './dto/update-tienda.dto';
import { Tienda } from './entities/tienda.entity';
import { PaginationParamsDto } from '../common/dto/pagination-params.dto';

@Controller('tiendas')
export class TiendasController {
  constructor(private readonly tiendasService: TiendasService) {}

  @Post()
  create(@Body() createTiendaDto: CreateTiendaDto): Promise<Tienda> {
    return this.tiendasService.create(createTiendaDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationParamsDto) {
    return this.tiendasService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Tienda> {
    return this.tiendasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateTiendaDto: UpdateTiendaDto
  ): Promise<Tienda> {
    return this.tiendasService.update(id, updateTiendaDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.tiendasService.remove(id);
  }
}
