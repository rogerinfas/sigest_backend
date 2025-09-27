import { Module } from '@nestjs/common';
import { UsuarioTiendaService } from './usuario_tienda.service';
import { UsuarioTiendaController } from './usuario_tienda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioTienda } from './entities/usuario_tienda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioTienda])],
  controllers: [UsuarioTiendaController],
  providers: [UsuarioTiendaService],
})
export class UsuarioTiendaModule {}
