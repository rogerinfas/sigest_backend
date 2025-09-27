import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn({ name: 'id_rol', type: 'int' })
  id_rol: number;

  @Column({ name: 'nombre_rol', type: 'varchar', length: 50, nullable: false, unique: true })
  nombre_rol: string; // admin, vendedor, supervisor

  @Column({ type: 'text', nullable: true })
  descripcion?: string | null;

  @OneToMany(() => Usuario, (u) => u.rol)
  usuarios: Usuario[];
}
