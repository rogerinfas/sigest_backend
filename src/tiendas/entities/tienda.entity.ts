import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioTienda } from '../../usuario_tienda/entities/usuario_tienda.entity';

@Entity({ name: 'tiendas' })
export class Tienda {
    @PrimaryGeneratedColumn({ name: 'id_tienda', type: 'int' })
    id_tienda: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    nombre: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    direccion?: string | null;

    @Column({ type: 'varchar', length: 20, nullable: true })
    telefono?: string | null;

    @Column({ type: 'varchar', length: 100, nullable: true })
    email?: string | null;

    @Column({ type: 'varchar', length: 20, nullable: true, name: 'codigo_interno', unique: true })
    codigo_interno?: string | null;

    @Column({ type: 'boolean', default: true })
    activa: boolean;

    @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
    fecha_creacion: Date;

    // Relaciones
    @OneToMany(() => UsuarioTienda, (ut) => ut.tienda)
    usuarios_tienda: UsuarioTienda[];
}
