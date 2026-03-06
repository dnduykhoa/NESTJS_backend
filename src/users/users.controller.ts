import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put, BadRequestException, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req) {
    return {
      success: true,
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        fullName: req.user.fullName,
        avatarUrl: req.user.avatarUrl,
        birthday: req.user.birthday,
        role: req.user.role,
        loginCount: req.user.loginCount,
      },
    };
  }

  @Put('profile')
  @UseGuards(AuthGuard('jwt'))
  async updateProfile(
    @Req() req,
    @Body() body: { fullName?: string; birthday?: string; avatarUrl?: string },
  ) {
    // Validation
    if (!body.fullName && !body.birthday && !body.avatarUrl) {
      throw new BadRequestException('Vui lòng nhập ít nhất một thông tin cần cập nhật');
    }

    const result = await this.usersService.updateProfile(req.user._id, body);

    if (!result) {
      throw new BadRequestException('Cập nhật thông tin thất bại');
    }

    return {
      success: true,
      message: 'Cập nhật thông tin thành công',
      user: {
        fullName: result.fullName,
        birthday: result.birthday,
        avatarUrl: result.avatarUrl,
      },
    };
  }

  @Post('upload-avatar')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `avatar-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const fileExt = extname(file.originalname).toLowerCase();
        const mimetype = allowedTypes.test(file.mimetype);
        const isValidExt = allowedTypes.test(fileExt);

        if (mimetype && isValidExt) {
          return callback(null, true);
        }
        callback(new BadRequestException('Chỉ chấp nhận file ảnh: .jpg, .jpeg, .png, .webp'), false);
      },
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    }),
  )
  async uploadAvatar(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Vui lòng chọn file ảnh');
    }

    const avatarUrl = `/uploads/avatars/${file.filename}`;
    
    // Cập nhật avatarUrl vào database
    const result = await this.usersService.updateProfile(req.user._id, { avatarUrl });

    return {
      success: true,
      message: 'Upload avatar thành công',
      avatarUrl: avatarUrl,
    };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
