import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateTiendaDto {
    @IsString()
    nombre: string;

    @IsOptional()
    @IsString()
    direccion?: string;

    @IsOptional()
    @IsString()
    telefono?: string;

    @IsOptional()
    @IsBoolean()
    activa?: boolean;
}
