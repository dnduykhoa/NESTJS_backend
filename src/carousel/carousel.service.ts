import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarouselSlide, CarouselSlideDocument } from './schemas/carousel-slide.schema';
import { CreateCarouselSlideDto, UpdateCarouselSlideDto } from './dto/carousel-slide.dto';
import { FileStorageService } from '../utils/file-storage.service';

@Injectable()
export class CarouselService {
  constructor(
    @InjectModel(CarouselSlide.name) private readonly slideModel: Model<CarouselSlideDocument>,
    private readonly fileStorage: FileStorageService,
  ) {}

  async getActiveSlides(): Promise<CarouselSlideDocument[]> {
    return this.slideModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec();
  }

  async getAllSlides(): Promise<CarouselSlideDocument[]> {
    return this.slideModel.find().sort({ displayOrder: 1 }).exec();
  }

  async getById(id: string): Promise<CarouselSlideDocument> {
    const slide = await this.slideModel.findById(id).exec();
    if (!slide) throw new NotFoundException(`Không tìm thấy slide với ID: ${id}`);
    return slide;
  }

  async create(
    dto: CreateCarouselSlideDto,
    mediaFile?: Express.Multer.File,
  ): Promise<CarouselSlideDocument> {
    let imageUrl: string | undefined = dto.image;
    let mediaType = dto.mediaType || 'IMAGE';

    if (mediaFile) {
      imageUrl = this.fileStorage.storeFile(mediaFile, 'carousel');
      mediaType = this.fileStorage.isVideoFile(mediaFile) ? 'VIDEO' : 'IMAGE';
    }

    const slide = new this.slideModel({
      ...dto,
      image: imageUrl,
      mediaType,
    });

    return slide.save();
  }

  async update(
    id: string,
    dto: UpdateCarouselSlideDto,
    mediaFile?: Express.Multer.File,
  ): Promise<CarouselSlideDocument> {
    const slide = await this.getById(id);

    if (mediaFile) {
      if (slide.image) this.fileStorage.deleteFile(slide.image);
      const newImageUrl = this.fileStorage.storeFile(mediaFile, 'carousel');
      const newMediaType = this.fileStorage.isVideoFile(mediaFile) ? 'VIDEO' : 'IMAGE';

      Object.assign(slide, dto);
      slide.image = newImageUrl;
      slide.mediaType = newMediaType;
    } else {
      Object.assign(slide, dto);
    }

    return slide.save();
  }

  async remove(id: string): Promise<void> {
    const slide = await this.getById(id);
    if (slide.image) this.fileStorage.deleteFile(slide.image);
    await this.slideModel.findByIdAndDelete(id);
  }
}
