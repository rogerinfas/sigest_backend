import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
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

  @ManyToOne(() => Role, (r) => r.usuarios, { nullable: false })
  @JoinColumn({ name: 'id_rol', referencedColumnName: 'id_rol' })
  rol: Role;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fecha_creacion: Date;

  @OneToMany(() => UsuarioTienda, (ut) => ut.usuario)
  usuarios_tienda: UsuarioTienda[];
}
