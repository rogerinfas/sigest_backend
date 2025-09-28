import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tiendas')
export class Tienda {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    nombre: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    direccion: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    telefono: string;

    @Column({ type: 'boolean', default: true })
    activa: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    fechaCreacion: Date;
}
