import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarouselController } from './carousel.controller';
import { CarouselService } from './carousel.service';
import { CarouselSlide, CarouselSlideSchema } from './schemas/carousel-slide.schema';
import { FileStorageService } from '../utils/file-storage.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CarouselSlide.name, schema: CarouselSlideSchema },
    ]),
  ],
  controllers: [CarouselController],
  providers: [CarouselService, FileStorageService],
  exports: [CarouselService],
})
export class CarouselModule {}
