import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleDocument> {
    const existing = await this.roleModel.findOne({ name: createRoleDto.name });
    if (existing) {
      throw new Error(`Đã tồn tại vai trò với tên: ${createRoleDto.name}`);
    }
    return new this.roleModel(createRoleDto).save();
  }

  async findAll(): Promise<RoleDocument[]> {
    return this.roleModel.find({ isDeleted: false }).exec();
  }

  async findById(id: string): Promise<RoleDocument> {
    const role = await this.roleModel.findById(id).exec();
    if (!role || role.isDeleted) {
      throw new NotFoundException(`Không tìm thấy vai trò với ID: ${id}`);
    }
    return role;
  }

  async findByName(name: string): Promise<RoleDocument | null> {
    return this.roleModel.findOne({ name, isDeleted: false }).exec();
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<RoleDocument> {
    const role = await this.findById(id);
    if (updateRoleDto.name && updateRoleDto.name !== role.name) {
      const existing = await this.roleModel.findOne({ name: updateRoleDto.name });
      if (existing) {
        throw new Error(`Đã tồn tại vai trò với tên: ${updateRoleDto.name}`);
      }
    }
    Object.assign(role, updateRoleDto);
    return role.save();
  }

  async remove(id: string): Promise<void> {
    const role = await this.findById(id);
    role.isDeleted = true;
    await role.save();
  }
}
