import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const entity = this.usuarioRepo.create({
      username: createUsuarioDto.username,
      password_hash: createUsuarioDto.password_hash,
      nombre: createUsuarioDto.nombre,
      email: createUsuarioDto.email,
      rol: { id_rol: createUsuarioDto.id_rol } as any,
      activo: createUsuarioDto.activo ?? true,
    } as any);
    return await this.usuarioRepo.save(entity);
  }

  async findAll() {
    return await this.usuarioRepo.find({ relations: { rol: true } });
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepo.findOne({ where: { id_usuario: id }, relations: { rol: true } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.findOne(id);
    Object.assign(usuario, updateUsuarioDto);
    if ((updateUsuarioDto as any).id_rol) {
      (usuario as any).rol = { id_rol: (updateUsuarioDto as any).id_rol } as any;
      delete (usuario as any).id_rol;
    }
    return await this.usuarioRepo.save(usuario);
  }

  async remove(id: number) {
    const usuario = await this.findOne(id);
    await this.usuarioRepo.remove(usuario);
    return { deleted: true };
  }
}
