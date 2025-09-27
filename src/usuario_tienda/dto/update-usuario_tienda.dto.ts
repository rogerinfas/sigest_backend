import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioTiendaDto } from './create-usuario_tienda.dto';

export class UpdateUsuarioTiendaDto extends PartialType(CreateUsuarioTiendaDto) {}
