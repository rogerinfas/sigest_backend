import { IsString, IsOptional, IsEmail, IsEnum, IsBoolean } from 'class-validator';
import { RolUsuario } from '../entities/usuario.entity';

export class CreateUsuarioDto {
    @IsString()
    username: string;

    @IsString()
    passwordHash: string;

    @IsString()
    nombre: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsEnum(RolUsuario)
    rol?: RolUsuario;

    @IsOptional()
    @IsBoolean()
    activo?: boolean;
}
