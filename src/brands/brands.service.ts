import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand, BrandDocument } from './schemas/brand.schema';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { FileStorageService } from '../utils/file-storage.service';
import { Product } from '../products/schemas/product.schema';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name) private readonly brandModel: Model<BrandDocument>,
    @InjectModel('Product') private readonly productModel: Model<any>,
    private readonly fileStorage: FileStorageService,
  ) {}

  async findAll(): Promise<BrandDocument[]> {
    return this.brandModel.find().sort({ displayOrder: 1, name: 1 }).exec();
  }

  async findActive(): Promise<BrandDocument[]> {
    return this.brandModel.find({ isActive: true }).sort({ displayOrder: 1, name: 1 }).exec();
  }

  async findById(id: string): Promise<BrandDocument> {
    const brand = await this.brandModel.findById(id).exec();
    if (!brand) throw new NotFoundException(`Không tìm thấy thương hiệu với ID: ${id}`);
    return brand;
  }

  async search(name: string): Promise<BrandDocument[]> {
    return this.brandModel
      .find({ name: { $regex: name, $options: 'i' } })
      .sort({ displayOrder: 1 })
      .exec();
  }

  async create(dto: CreateBrandDto, logoFile?: Express.Multer.File): Promise<BrandDocument> {
    const existing = await this.brandModel.findOne({ name: dto.name });
    if (existing) throw new Error(`Đã tồn tại thương hiệu với tên: ${dto.name}`);

    let logoUrl: string | undefined;
    if (logoFile) {
      if (!this.fileStorage.isImageFile(logoFile)) {
        throw new Error('File logo phải là ảnh (JPG, PNG, WEBP, SVG,...)');
      }
      logoUrl = this.fileStorage.storeFile(logoFile, 'brands');
    }

    return new this.brandModel({
      ...dto,
      logoUrl,
      displayOrder: dto.displayOrder ?? 0,
      isActive: dto.isActive ?? true,
    }).save();
  }

  async update(id: string, dto: UpdateBrandDto, logoFile?: Express.Multer.File): Promise<BrandDocument> {
    const brand = await this.findById(id);

    if (dto.name && dto.name !== brand.name) {
      const existing = await this.brandModel.findOne({ name: dto.name });
      if (existing) throw new Error(`Đã tồn tại thương hiệu với tên: ${dto.name}`);
    }

    if (logoFile) {
      if (!this.fileStorage.isImageFile(logoFile)) {
        throw new Error('File logo phải là ảnh');
      }
      // Xóa logo cũ
      if (brand.logoUrl) this.fileStorage.deleteFile(brand.logoUrl);
      brand.logoUrl = this.fileStorage.storeFile(logoFile, 'brands');
    }

    Object.assign(brand, dto);
    return brand.save();
  }

  async remove(id: string): Promise<void> {
    const brand = await this.findById(id);
    const productCount = await this.productModel.countDocuments({ brand: id });
    if (productCount > 0) {
      throw new BadRequestException(
        `Không thể xóa thương hiệu này vì còn ${productCount} sản phẩm. Hãy xóa hoặc chuyển sản phẩm trước`,
      );
    }
    if (brand.logoUrl) this.fileStorage.deleteFile(brand.logoUrl);
    await this.brandModel.findByIdAndDelete(id);
  }
}
