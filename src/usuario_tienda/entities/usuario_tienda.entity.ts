import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Tienda } from '../../tiendas/entities/tienda.entity';

@Entity({ name: 'usuario_tienda' })
export class UsuarioTienda {
  @PrimaryGeneratedColumn({ name: 'id_usuario_tienda', type: 'int' })
  id_usuario_tienda: number;

  @ManyToOne(() => Usuario, (u) => u.usuarios_tienda, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Tienda, (t) => t.usuarios_tienda, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'id_tienda', referencedColumnName: 'id_tienda' })
  tienda: Tienda;

  @CreateDateColumn({ name: 'fecha_asignacion', type: 'timestamp' })
  fecha_asignacion: Date;
}
