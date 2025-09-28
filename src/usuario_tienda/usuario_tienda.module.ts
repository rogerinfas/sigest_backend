import { Module } from '@nestjs/common';
import { UsuarioTiendaService } from './usuario_tienda.service';
import { UsuarioTiendaController } from './usuario_tienda.controller';

@Module({
  controllers: [UsuarioTiendaController],
  providers: [UsuarioTiendaService],
})
export class UsuarioTiendaModule {}
