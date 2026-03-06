import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) 
    private userModel: Model<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findById(id: string) {
    return this.userModel.findById(id).select('-password').populate('role');
  }

  async updateProfile(
    userId: string,
    data: { fullName?: string; birthday?: string; avatarUrl?: string },
  ) {
    const updateData: any = {};
    
    if (data.fullName) updateData.fullName = data.fullName;
    if (data.birthday) updateData.birthday = new Date(data.birthday);
    if (data.avatarUrl) updateData.avatarUrl = data.avatarUrl;

    const user = await this.userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true },
    ).select('-password');

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
