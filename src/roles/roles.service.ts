import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const entity = this.roleRepo.create(createRoleDto as any);
    return await this.roleRepo.save(entity);
  }

  async findAll() {
    return await this.roleRepo.find();
  }

  async findOne(id: number) {
    const role = await this.roleRepo.findOne({ where: { id_rol: id } });
    if (!role) throw new NotFoundException('Rol no encontrado');
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);
    Object.assign(role, updateRoleDto);
    return await this.roleRepo.save(role);
  }

  async remove(id: number) {
    const role = await this.findOne(id);
    await this.roleRepo.remove(role);
    return { deleted: true };
  }
}
