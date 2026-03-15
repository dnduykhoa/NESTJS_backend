import { Model } from 'mongoose';
import { BrandDocument } from './schemas/brand.schema';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { FileStorageService } from '../utils/file-storage.service';
export declare class BrandsService {
    private readonly brandModel;
    private readonly productModel;
    private readonly fileStorage;
    constructor(brandModel: Model<BrandDocument>, productModel: Model<any>, fileStorage: FileStorageService);
    findAll(): Promise<BrandDocument[]>;
    findActive(): Promise<BrandDocument[]>;
    findById(id: string): Promise<BrandDocument>;
    search(name: string): Promise<BrandDocument[]>;
    create(dto: CreateBrandDto, logoFile?: Express.Multer.File): Promise<BrandDocument>;
    update(id: string, dto: UpdateBrandDto, logoFile?: Express.Multer.File): Promise<BrandDocument>;
    remove(id: string): Promise<void>;
}
