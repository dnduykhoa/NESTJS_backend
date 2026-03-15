import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AttributeGroupsService } from '../services/attribute-groups.service';
import { CreateAttributeGroupDto } from '../dto/create-attribute-group.dto';
import { UpdateAttributeGroupDto } from '../dto/update-attribute-group.dto';
import { ApiResponse } from '../../common/dto/api-response.dto';

@Controller('attribute-groups')
export class AttributeGroupsController {
  constructor(private readonly attributeGroupsService: AttributeGroupsService) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const groups = await this.attributeGroupsService.getAllGroups();
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Lấy danh sách nhóm thuộc tính thành công', groups));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Get('active')
  async getActive(@Res() res: Response) {
    try {
      const groups = await this.attributeGroupsService.getActiveGroups();
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Lấy nhóm thuộc tính đang hoạt động thành công', groups));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() res: Response) {
    try {
      const group = await this.attributeGroupsService.getGroupById(id);
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Lấy thông tin nhóm thuộc tính thành công', group));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Post('add')
  async create(@Body() dto: CreateAttributeGroupDto, @Res() res: Response) {
    try {
      const group = await this.attributeGroupsService.createGroup(dto);
      return res
        .status(HttpStatus.CREATED)
        .json(new ApiResponse('Tạo nhóm thuộc tính thành công', group));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAttributeGroupDto,
    @Res() res: Response,
  ) {
    try {
      const group = await this.attributeGroupsService.updateGroup(id, dto);
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Cập nhật nhóm thuộc tính thành công', group));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.attributeGroupsService.deleteGroup(id);
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Xóa nhóm thuộc tính thành công', null));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }
}
