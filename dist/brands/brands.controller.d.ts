import { Response } from 'express';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
export declare class BrandsController {
    private readonly brandsService;
    constructor(brandsService: BrandsService);
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findActive(res: Response): Promise<Response<any, Record<string, any>>>;
    search(name: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    create(dto: CreateBrandDto, logo: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, dto: UpdateBrandDto, logo: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
    remove(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
