import { Exclude } from 'class-transformer';
import { RolUsuario } from '../entities/usuario.entity';

export class UsuarioResponseDto {
    id: number;
    username: string;
    nombre: string;
    email: string;
    rol: RolUsuario;
    activo: boolean;
    fechaCreacion: Date;

    @Exclude()
    passwordHash: string;
}
