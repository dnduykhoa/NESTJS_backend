import {
  Controller, Get, Post, Put, Delete,
  Param, Body, Query, Res, HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiResponse } from '../common/dto/api-response.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const categories = await this.categoriesService.findAll();
      return res.status(HttpStatus.OK).json(new ApiResponse('Lấy danh sách danh mục thành công', categories));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Get('root')
  async findRoot(@Res() res: Response) {
    try {
      const categories = await this.categoriesService.findRoot();
      return res.status(HttpStatus.OK).json(new ApiResponse('Lấy danh sách danh mục gốc thành công', categories));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Get('active')
  async findActive(@Res() res: Response) {
    try {
      const categories = await this.categoriesService.findActive();
      return res.status(HttpStatus.OK).json(new ApiResponse('Lấy danh sách danh mục đang hoạt động thành công', categories));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Get('search')
  async search(@Query('name') name: string, @Res() res: Response) {
    try {
      const categories = await this.categoriesService.search(name || '');
      return res.status(HttpStatus.OK).json(new ApiResponse('Tìm kiếm danh mục thành công', categories));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const category = await this.categoriesService.findById(id);
      return res.status(HttpStatus.OK).json(new ApiResponse('Lấy thông tin danh mục thành công', category));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Get(':id/children')
  async findChildren(@Param('id') id: string, @Res() res: Response) {
    try {
      const categories = await this.categoriesService.findChildren(id);
      return res.status(HttpStatus.OK).json(new ApiResponse('Lấy danh sách danh mục con thành công', categories));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Post('add')
  async create(@Body() dto: CreateCategoryDto, @Res() res: Response) {
    try {
      const category = await this.categoriesService.create(dto);
      return res.status(HttpStatus.CREATED).json(new ApiResponse('Tạo danh mục thành công', category));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
    @Res() res: Response,
  ) {
    try {
      const category = await this.categoriesService.update(id, dto);
      return res.status(HttpStatus.OK).json(new ApiResponse('Cập nhật danh mục thành công', category));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.categoriesService.remove(id);
      return res.status(HttpStatus.OK).json(new ApiResponse('Xóa danh mục thành công', null));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }
}
