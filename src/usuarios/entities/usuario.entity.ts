import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioTienda } from '../../usuario_tienda/entities/usuario_tienda.entity';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario', type: 'int' })
  id_usuario: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  username: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255, nullable: false })
  password_hash: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email?: string | null;

  @Column({
    name: 'rol',
    type: 'enum',
    enum: ['admin', 'vendedor', 'supervisor'],
    nullable: false,
  })
  rol: 'admin' | 'vendedor' | 'supervisor';

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fecha_creacion: Date;

  @OneToMany(() => UsuarioTienda, (ut) => ut.usuario)
  usuarios_tienda: UsuarioTienda[];
}
