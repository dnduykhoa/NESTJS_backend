import {
  Controller, Get, Put, Delete,
  Param, Body, Query, Res, HttpStatus, UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiResponse } from '../common/dto/api-response.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ── Lấy profile theo ID ──────────────────────────────────────────────────

  @Get('profile/:id')
  async getProfile(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.usersService.findById(id);
      return res.status(HttpStatus.OK).json(new ApiResponse('Lấy thông tin người dùng thành công', user));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // ── Cập nhật profile ─────────────────────────────────────────────────────

  @Put('profile/:id')
  async updateProfile(
    @Param('id') id: string,
    @Body() dto: UpdateProfileDto,
    @Res() res: Response,
  ) {
    try {
      const user = await this.usersService.updateProfile(id, dto);
      return res.status(HttpStatus.OK).json(new ApiResponse('Cập nhật thông tin thành công', user));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // ── Lấy tất cả users (admin) ─────────────────────────────────────────────

  @Get()
  async getAllUsers(@Res() res: Response) {
    try {
      const users = await this.usersService.getAllUsers();
      return res.status(HttpStatus.OK).json(new ApiResponse('Lấy danh sách người dùng thành công', users));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // ── Tìm kiếm users ───────────────────────────────────────────────────────

  @Get('search')
  async searchUsers(@Query('keyword') keyword: string, @Res() res: Response) {
    try {
      const users = await this.usersService.searchUsers(keyword || '');
      return res.status(HttpStatus.OK).json(new ApiResponse('Tìm kiếm người dùng thành công', users));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // ── Xóa user (admin) ─────────────────────────────────────────────────────

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.usersService.deleteUser(id);
      return res.status(HttpStatus.OK).json(new ApiResponse('Xóa người dùng thành công', null));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // ── Cập nhật roles (admin) ───────────────────────────────────────────────

  @Put(':id/roles')
  async updateRoles(
    @Param('id') id: string,
    @Body() dto: UpdateUserRolesDto,
    @Res() res: Response,
  ) {
    try {
      const user = await this.usersService.updateUserRoles(id, dto.roles);
      return res.status(HttpStatus.OK).json(new ApiResponse('Cập nhật vai trò thành công', user));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }
}
