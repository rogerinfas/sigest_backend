import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioTienda } from './entities/usuario_tienda.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Tienda } from '../tiendas/entities/tienda.entity';
import { UsuarioTiendaService } from './usuario_tienda.service';
import { UsuarioTiendaController } from './usuario_tienda.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioTienda, Usuario, Tienda])],
  providers: [UsuarioTiendaService],
  controllers: [UsuarioTiendaController],
  exports: [UsuarioTiendaService],
})
export class UsuarioTiendaModule {}
