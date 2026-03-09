import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './schemas/brand.schema';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name) 
    private brandModel: Model<Brand>,
    @InjectModel('Product') 
    private productModel: Model<any>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    const createdBrand = new this.brandModel(createBrandDto);
    return createdBrand.save();
  }

  async findAll() {
    return this.brandModel.find().exec();
  }

  async findActive() {
    return this.brandModel.find({ isActive: true }).exec();
  }

  async search(name: string) {
    return this.brandModel
      .find({ name: { $regex: name, $options: 'i' } })
      .exec();
  }

  async findOne(id: string) {
    const brand = await this.brandModel.findById(id).exec();
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    const updatedBrand = await this.brandModel
      .findByIdAndUpdate(id, updateBrandDto, { new: true })
      .exec();
    if (!updatedBrand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return updatedBrand;
  }

  async remove(id: string) {
    // Kiểm tra xem có sản phẩm nào thuộc thương hiệu này không
    const productCount = await this.productModel.countDocuments({ brand: id }).exec();
    if (productCount > 0) {
      throw new BadRequestException(
        `Cannot delete this brand because it has ${productCount} products. Please reassign or delete the products first.`
      );
    }

    const deletedBrand = await this.brandModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedBrand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return { message: 'Brand deleted successfully', brand: deletedBrand };
  }
}
