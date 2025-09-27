import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @Length(1, 50)
  username: string;

  @IsString()
  @MaxLength(255)
  password_hash: string;

  @IsString()
  @Length(1, 100)
  nombre: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @IsEnum(['admin', 'vendedor', 'supervisor'])
  rol: 'admin' | 'vendedor' | 'supervisor';

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
