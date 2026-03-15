import {
  Controller, Get, Post, Put, Delete,
  Param, Body, Query, Res, HttpStatus,
  UseInterceptors, UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { memoryStorage } from 'multer';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiResponse } from '../common/dto/api-response.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const brands = await this.brandsService.findAll();
      return res.status(HttpStatus.OK).json(new ApiResponse('Lấy danh sách thương hiệu thành công', brands));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Get('active')
  async findActive(@Res() res: Response) {
    try {
      const brands = await this.brandsService.findActive();
      return res.status(HttpStatus.OK).json(new ApiResponse('Lấy thương hiệu đang hoạt động thành công', brands));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Get('search')
  async search(@Query('name') name: string, @Res() res: Response) {
    try {
      const brands = await this.brandsService.search(name || '');
      return res.status(HttpStatus.OK).json(new ApiResponse('Tìm kiếm thương hiệu thành công', brands));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const brand = await this.brandsService.findById(id);
      return res.status(HttpStatus.OK).json(new ApiResponse('Lấy thông tin thương hiệu thành công', brand));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Post('add')
  @UseInterceptors(FileInterceptor('logo', { storage: memoryStorage() }))
  async create(
    @Body() dto: CreateBrandDto,
    @UploadedFile() logo: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const brand = await this.brandsService.create(dto, logo);
      return res.status(HttpStatus.CREATED).json(new ApiResponse('Tạo thương hiệu thành công', brand));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Put('update/:id')
  @UseInterceptors(FileInterceptor('logo', { storage: memoryStorage() }))
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBrandDto,
    @UploadedFile() logo: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const brand = await this.brandsService.update(id, dto, logo);
      return res.status(HttpStatus.OK).json(new ApiResponse('Cập nhật thương hiệu thành công', brand));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.brandsService.remove(id);
      return res.status(HttpStatus.OK).json(new ApiResponse('Xóa thương hiệu thành công', null));
    } catch (e: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }
}
