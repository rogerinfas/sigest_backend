import { IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @Length(1, 50)
  nombre_rol: string;

  @IsOptional()
  @IsString()
  @MaxLength(65535)
  descripcion?: string;
}
