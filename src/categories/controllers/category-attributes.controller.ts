import {
  Controller, Get, Post, Put, Delete,
  Param, Body, Query, Res, HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CategoryAttributesService } from '../services/category-attributes.service';
import { CreateCategoryAttributeDto } from '../dto/create-category-attribute.dto';
import { UpdateCategoryAttributeDto } from '../dto/update-category-attribute.dto';
import { ApiResponse } from '../../common/dto/api-response.dto';

@Controller('category-attributes')
export class CategoryAttributesController {
  constructor(private readonly categoryAttributesService: CategoryAttributesService) {}

  @Get('by-category/:categoryId')
  async getByCategory(@Param('categoryId') categoryId: string, @Res() res: Response) {
    try {
      const attributes = await this.categoryAttributesService.getByCategory(categoryId);
      return res.status(HttpStatus.OK).json(new ApiResponse('Lấy thuộc tính danh mục thành công', attributes));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Post('assign')
  async assign(
    @Body() body: CreateCategoryAttributeDto,
    @Query('categoryId') qCategoryId: string,
    @Query('attrDefId') qAttrDefId: string,
    @Query('isRequired') qIsRequired: string,
    @Query('displayOrder') qDisplayOrder: string,
    @Res() res: Response,
  ) {
    try {
      const dto: CreateCategoryAttributeDto = {
        categoryId: body.categoryId || qCategoryId,
        attrDefId: body.attrDefId || qAttrDefId,
        isRequired: body.isRequired !== undefined
          ? body.isRequired
          : qIsRequired !== undefined ? qIsRequired === 'true' : undefined,
        displayOrder: body.displayOrder !== undefined
          ? body.displayOrder
          : qDisplayOrder !== undefined ? Number(qDisplayOrder) : undefined,
      };
      const assignment = await this.categoryAttributesService.assign(dto);
      return res.status(HttpStatus.CREATED).json(new ApiResponse('Gán thuộc tính cho danh mục thành công', assignment));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Put('update/:id')
  async updateAssignment(
    @Param('id') id: string,
    @Body() body: UpdateCategoryAttributeDto,
    @Query('isRequired') qIsRequired: string,
    @Query('displayOrder') qDisplayOrder: string,
    @Res() res: Response,
  ) {
    try {
      const dto: UpdateCategoryAttributeDto = {
        isRequired: body.isRequired !== undefined
          ? body.isRequired
          : qIsRequired !== undefined ? qIsRequired === 'true' : undefined,
        displayOrder: body.displayOrder !== undefined
          ? body.displayOrder
          : qDisplayOrder !== undefined ? Number(qDisplayOrder) : undefined,
      };
      const assignment = await this.categoryAttributesService.updateAssignment(id, dto);
      return res.status(HttpStatus.OK).json(new ApiResponse('Cập nhật liên kết thuộc tính-danh mục thành công', assignment));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Delete('remove')
  async removeByCategoryAndDef(
    @Query('categoryId') categoryId: string,
    @Query('attrDefId') attrDefId: string,
    @Res() res: Response,
  ) {
    try {
      await this.categoryAttributesService.removeByCategoryAndDef(categoryId, attrDefId);
      return res.status(HttpStatus.OK).json(new ApiResponse('Xóa liên kết thuộc tính-danh mục thành công', null));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Delete('remove/:id')
  async removeById(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.categoryAttributesService.removeById(id);
      return res.status(HttpStatus.OK).json(new ApiResponse('Xóa liên kết thuộc tính-danh mục thành công', null));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }
}
