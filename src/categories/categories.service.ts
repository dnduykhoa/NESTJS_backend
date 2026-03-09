import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel('Product') private productModel: Model<any>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll() {
    return this.categoryModel.find().populate('parent').exec();
  }

  async findRoot() {
    return this.categoryModel.find({ parent: null }).exec();
  }

  async findChildren(id: string) {
    return this.categoryModel.find({ parent: id }).exec();
  }

  async findActive() {
    return this.categoryModel.find({ isActive: true }).exec();
  }

  async search(name: string) {
    return this.categoryModel
      .find({ name: { $regex: name, $options: 'i' } })
      .exec();
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).populate('parent').exec();
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
    if (!updatedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return updatedCategory;
  }

  async remove(id: string) {
    // Kiểm tra danh mục con
    const childrenCount = await this.categoryModel.countDocuments({ parent: id }).exec();
    if (childrenCount > 0) {
      throw new BadRequestException(
        `Cannot delete this category because it has ${childrenCount} child categories. Please delete or reassign them first.`
      );
    }

    // Kiểm tra sản phẩm
    const productCount = await this.productModel.countDocuments({ category: id }).exec();
    if (productCount > 0) {
      throw new BadRequestException(
        `Cannot delete this category because it has ${productCount} products. Please reassign or delete the products first.`
      );
    }

    const deletedCategory = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!deletedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return { message: 'Category deleted successfully', category: deletedCategory };
  }
}
