import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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
}
