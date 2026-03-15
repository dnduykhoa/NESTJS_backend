import { Model } from 'mongoose';
import { CarouselSlideDocument } from './schemas/carousel-slide.schema';
import { CreateCarouselSlideDto, UpdateCarouselSlideDto } from './dto/carousel-slide.dto';
import { FileStorageService } from '../utils/file-storage.service';
export declare class CarouselService {
    private readonly slideModel;
    private readonly fileStorage;
    constructor(slideModel: Model<CarouselSlideDocument>, fileStorage: FileStorageService);
    getActiveSlides(): Promise<CarouselSlideDocument[]>;
    getAllSlides(): Promise<CarouselSlideDocument[]>;
    getById(id: string): Promise<CarouselSlideDocument>;
    create(dto: CreateCarouselSlideDto, mediaFile?: Express.Multer.File): Promise<CarouselSlideDocument>;
    update(id: string, dto: UpdateCarouselSlideDto, mediaFile?: Express.Multer.File): Promise<CarouselSlideDocument>;
    remove(id: string): Promise<void>;
}
