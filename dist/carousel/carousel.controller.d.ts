import { Response } from 'express';
import { CarouselService } from './carousel.service';
import { CreateCarouselSlideDto, UpdateCarouselSlideDto } from './dto/carousel-slide.dto';
import { FileStorageService } from '../utils/file-storage.service';
export declare class CarouselController {
    private readonly carouselService;
    private readonly fileStorage;
    constructor(carouselService: CarouselService, fileStorage: FileStorageService);
    uploadFile(file: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
    getActiveSlides(res: Response): Promise<Response<any, Record<string, any>>>;
    getAllSlides(res: Response): Promise<Response<any, Record<string, any>>>;
    create(dto: CreateCarouselSlideDto, media: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, dto: UpdateCarouselSlideDto, media: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
    remove(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
