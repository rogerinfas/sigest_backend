import { IsBoolean, IsEmail, IsInt, IsOptional, IsString, Length, MaxLength, Min } from 'class-validator';

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

  @IsInt()
  @Min(1)
  id_rol: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
