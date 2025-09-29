import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Tienda } from '../../tiendas/entities/tienda.entity';

export class UsuarioTiendaResponseDto {
    id: number;
    usuario: Usuario;
    tienda: Tienda;
    fechaAsignacion: Date;
}
