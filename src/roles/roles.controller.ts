import {
  Controller, Get, Post, Put, Delete,
  Param, Body, HttpStatus, Res,
} from '@nestjs/common';
import { Response } from 'express';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiResponse } from '../common/dto/api-response.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const roles = await this.rolesService.findAll();
      return res.status(HttpStatus.OK).json(new ApiResponse('Lấy danh sách vai trò thành công', roles));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const role = await this.rolesService.findById(id);
      return res.status(HttpStatus.OK).json(new ApiResponse('Lấy thông tin vai trò thành công', role));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Post('add')
  async create(@Body() dto: CreateRoleDto, @Res() res: Response) {
    try {
      const role = await this.rolesService.create(dto);
      return res.status(HttpStatus.CREATED).json(new ApiResponse('Tạo vai trò thành công', role));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateRoleDto, @Res() res: Response) {
    try {
      const role = await this.rolesService.update(id, dto);
      return res.status(HttpStatus.OK).json(new ApiResponse('Cập nhật vai trò thành công', role));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.rolesService.remove(id);
      return res.status(HttpStatus.OK).json(new ApiResponse('Xóa vai trò thành công', null));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }
}
