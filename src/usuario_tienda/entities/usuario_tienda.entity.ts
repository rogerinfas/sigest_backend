import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Tienda } from '../../tiendas/entities/tienda.entity';

@Entity('usuario_tienda')
@Unique(['usuario', 'tienda']) // Constraint de unicidad compuesta
export class UsuarioTienda {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario, { eager: true })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @ManyToOne(() => Tienda, { eager: true })
    @JoinColumn({ name: 'tienda_id' })
    tienda: Tienda;

    @CreateDateColumn({ type: 'timestamp' })
    fechaAsignacion: Date;
}
