import { IsInt, Min } from 'class-validator';

export class CreateUsuarioTiendaDto {
  @IsInt()
  @Min(1)
  id_usuario: number;

  @IsInt()
  @Min(1)
  id_tienda: number;
}
