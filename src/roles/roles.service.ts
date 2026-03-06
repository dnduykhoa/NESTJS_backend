import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './schemas/role.schema';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const createdRole = new this.roleModel(createRoleDto);
    return createdRole.save();
  }

  async findAll() {
    return this.roleModel.find({ isDeleted: false }).exec();
  }

  async findOne(id: string) {
    const role = await this.roleModel.findById(id).exec();
    if (!role || role.isDeleted) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const updatedRole = await this.roleModel
      .findByIdAndUpdate(id, updateRoleDto, { new: true })
      .exec();
    if (!updatedRole || updatedRole.isDeleted) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return updatedRole;
  }

  async remove(id: string) {
    const deletedRole = await this.roleModel
      .findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .exec();
    if (!deletedRole) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return { message: 'Role deleted successfully', role: deletedRole };
  }
}