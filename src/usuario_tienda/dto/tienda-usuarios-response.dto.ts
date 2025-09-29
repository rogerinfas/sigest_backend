export class UsuarioResponseDto {
  id: number;
  username: string;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
  fechaCreacion: Date;
}

export class TiendaUsuariosResponseDto {
  tienda: {
    id: number;
    nombre: string;
  };
  usuarios: UsuarioResponseDto[];
}
