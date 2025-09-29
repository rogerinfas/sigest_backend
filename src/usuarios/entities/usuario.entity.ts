import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { UsuarioTienda } from '../../usuario_tienda/entities/usuario_tienda.entity';

export enum RolUsuario {
    ADMINISTRADOR = 'Administrador',
    VENDEDOR = 'Vendedor',
    SUPERVISOR = 'Supervisor',
    INVITADO = 'Invitado'
}

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
    username: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    passwordHash: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    nombre: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    email: string;

    @Column({
        type: 'enum',
        enum: RolUsuario,
        default: RolUsuario.INVITADO,
        nullable: false
    })
    rol: RolUsuario;

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    fechaCreacion: Date;

    @OneToMany(() => UsuarioTienda, usuarioTienda => usuarioTienda.usuario)
    usuarioTiendas: UsuarioTienda[];
}
