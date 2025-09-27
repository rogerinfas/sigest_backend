import { IsBoolean, IsEmail, IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class CreateTiendaDto {
  @IsString()
  @Length(1, 100)
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  direccion?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  codigo_interno?: string;

  @IsOptional()
  @IsBoolean()
  activa?: boolean;
}
