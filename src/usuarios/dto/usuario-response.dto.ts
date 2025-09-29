import { Exclude } from 'class-transformer';
import { RolUsuario } from '../entities/usuario.entity';
import { UsuarioTienda } from '../../usuario_tienda/entities/usuario_tienda.entity';

export class UsuarioResponseDto {
    id: number;
    username: string;
    nombre: string;
    email: string;
    rol: RolUsuario;
    activo: boolean;
    fechaCreacion: Date;
    usuarioTiendas?: UsuarioTienda[];

    @Exclude()
    passwordHash: string;
}
