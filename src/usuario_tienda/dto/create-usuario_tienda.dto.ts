import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateUsuarioTiendaDto {
    @IsInt()
    @IsNotEmpty()
    usuarioId: number;

    @IsInt()
    @IsNotEmpty()
    tiendaId: number;
}
