import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Role, RoleDocument } from '../roles/schemas/role.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PhoneValidator } from '../utils/phone.validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel
      .findById(id)
      .select('-password -resetPasswordToken -resetPasswordExpires')
      .populate('role')
      .exec();
    if (!user || user.isDeleted) {
      throw new NotFoundException(`Không tìm thấy người dùng với ID: ${id}`);
    }
    return user;
  }

  async getAllUsers(): Promise<UserDocument[]> {
    return this.userModel
      .find({ isDeleted: false })
      .select('-password -resetPasswordToken -resetPasswordExpires')
      .populate('role')
      .exec();
  }

  async searchUsers(keyword: string): Promise<UserDocument[]> {
    const regex = new RegExp(keyword, 'i');
    return this.userModel
      .find({
        isDeleted: false,
        $or: [{ username: regex }, { email: regex }, { fullName: regex }],
      })
      .select('-password -resetPasswordToken -resetPasswordExpires')
      .populate('role')
      .exec();
  }

  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<UserDocument> {
    const user = await this.userModel.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    if (dto.fullName !== undefined) user.fullName = dto.fullName;
    if (dto.email !== undefined) {
      const emailLower = dto.email.toLowerCase();
      const existing = await this.userModel.findOne({ email: emailLower, _id: { $ne: userId } });
      if (existing) throw new Error('Email đã được sử dụng');
      user.email = emailLower;
    }
    if (dto.phone !== undefined) {
      const normalized = PhoneValidator.normalize(dto.phone);
      const existing = await this.userModel.findOne({ phone: normalized, _id: { $ne: userId } });
      if (existing) throw new Error('Số điện thoại đã được sử dụng');
      user.phone = normalized;
    }
    if (dto.birthDate !== undefined) {
      user.birthDate = dto.birthDate ? new Date(dto.birthDate) : null;
    }
    if (dto.avatarUrl !== undefined) user.avatarUrl = dto.avatarUrl;

    return user.save();
  }

  async updateUserRoles(userId: string, roleNames: string[]): Promise<UserDocument> {
    const user = await this.userModel.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    if (roleNames.length === 0) throw new Error('Phải có ít nhất 1 vai trò');

    // Lấy role đầu tiên (user chỉ có 1 role trong schema này)
    const roleName = roleNames[0];
    const role = await this.roleModel.findOne({ name: roleName });
    if (!role) throw new Error(`Không tìm thấy vai trò: ${roleName}`);

    user.role = (role as any)._id;
    return user.save();
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    user.isDeleted = true;
    await user.save();
  }
}
