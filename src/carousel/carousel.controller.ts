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
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { memoryStorage } from 'multer';
import { CarouselService } from './carousel.service';
import { CreateCarouselSlideDto, UpdateCarouselSlideDto } from './dto/carousel-slide.dto';
import { ApiResponse } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { FileStorageService } from '../utils/file-storage.service';

@Controller('carousel')
export class CarouselController {
  constructor(
    private readonly carouselService: CarouselService,
    private readonly fileStorage: FileStorageService,
  ) {}

  // POST /carousel/upload — upload single file, return {url}
  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      if (!file) throw new Error('Không có file được upload');
      if (!this.fileStorage.isImageOrVideoFile(file)) {
        throw new Error('File phải là ảnh hoặc video');
      }
      const url = this.fileStorage.storeFile(file, 'carousel');
      return res.status(HttpStatus.OK).json(new ApiResponse('Upload file thành công', { url }));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // GET /carousel — public: active slides only
  @Get()
  async getActiveSlides(@Res() res: Response) {
    try {
      const slides = await this.carouselService.getActiveSlides();
      return res.status(HttpStatus.OK).json(
        new ApiResponse('Lấy danh sách slide đang hoạt động thành công', slides),
      );
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // GET /carousel/all — admin: all slides
  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getAllSlides(@Res() res: Response) {
    try {
      const slides = await this.carouselService.getAllSlides();
      return res.status(HttpStatus.OK).json(new ApiResponse('Lấy tất cả slide thành công', slides));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // POST /carousel — create (multipart: fields + optional file 'media')
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('media', { storage: memoryStorage() }))
  async create(
    @Body() dto: CreateCarouselSlideDto,
    @UploadedFile() media: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const slide = await this.carouselService.create(dto, media);
      return res.status(HttpStatus.CREATED).json(new ApiResponse('Tạo slide thành công', slide));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // PUT /carousel/:id — update (multipart)
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('media', { storage: memoryStorage() }))
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCarouselSlideDto,
    @UploadedFile() media: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const slide = await this.carouselService.update(id, dto, media);
      return res.status(HttpStatus.OK).json(new ApiResponse('Cập nhật slide thành công', slide));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // DELETE /carousel/:id
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.carouselService.remove(id);
      return res.status(HttpStatus.OK).json(new ApiResponse('Xóa slide thành công', null));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }
}
