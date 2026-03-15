import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel('Product') private readonly productModel: Model<any>,
  ) {}

  async findAll(): Promise<CategoryDocument[]> {
    return this.categoryModel
      .find()
      .populate('parent')
      .sort({ displayOrder: 1, name: 1 })
      .exec();
  }

  async findRoot(): Promise<CategoryDocument[]> {
    return this.categoryModel
      .find({ parent: null })
      .sort({ displayOrder: 1, name: 1 })
      .exec();
  }

  async findChildren(id: string): Promise<CategoryDocument[]> {
    return this.categoryModel
      .find({ parent: id })
      .sort({ displayOrder: 1, name: 1 })
      .exec();
  }

  async findActive(): Promise<CategoryDocument[]> {
    return this.categoryModel
      .find({ isActive: true })
      .populate('parent')
      .sort({ displayOrder: 1, name: 1 })
      .exec();
  }

  async search(name: string): Promise<CategoryDocument[]> {
    return this.categoryModel
      .find({ name: { $regex: name, $options: 'i' } })
      .populate('parent')
      .sort({ displayOrder: 1 })
      .exec();
  }

  async findById(id: string): Promise<CategoryDocument> {
    const category = await this.categoryModel.findById(id).populate('parent').exec();
    if (!category) throw new NotFoundException(`Không tìm thấy danh mục với ID: ${id}`);
    return category;
  }

  async create(dto: CreateCategoryDto): Promise<CategoryDocument> {
    const existing = await this.categoryModel.findOne({ name: dto.name });
    if (existing) throw new Error(`Đã tồn tại danh mục với tên: ${dto.name}`);

    let parent: string | null = null;
    if (dto.parentId) {
      const parentCategory = await this.categoryModel.findById(dto.parentId);
      if (!parentCategory) throw new NotFoundException(`Không tìm thấy danh mục cha với ID: ${dto.parentId}`);
      parent = dto.parentId;
    }

    return new this.categoryModel({
      name: dto.name,
      description: dto.description,
      displayOrder: dto.displayOrder ?? 0,
      isActive: dto.isActive ?? true,
      parent,
    }).save();
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<CategoryDocument> {
    const category = await this.findById(id);

    if (dto.name && dto.name !== category.name) {
      const existing = await this.categoryModel.findOne({ name: dto.name });
      if (existing) throw new Error(`Đã tồn tại danh mục với tên: ${dto.name}`);
    }

    if (dto.parentId !== undefined) {
      if (dto.parentId === null || dto.parentId === '') {
        (category as any).parent = null;
      } else {
        if (dto.parentId === id) {
          throw new BadRequestException('Danh mục không thể là cha của chính nó');
        }
        const parentCategory = await this.categoryModel.findById(dto.parentId);
        if (!parentCategory) throw new NotFoundException(`Không tìm thấy danh mục cha với ID: ${dto.parentId}`);
        (category as any).parent = dto.parentId;
      }
    }

    if (dto.name !== undefined) category.name = dto.name;
    if (dto.description !== undefined) category.description = dto.description;
    if (dto.displayOrder !== undefined) category.displayOrder = dto.displayOrder;
    if (dto.isActive !== undefined) category.isActive = dto.isActive;

    return category.save();
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);

    const childCount = await this.categoryModel.countDocuments({ parent: id });
    if (childCount > 0) {
      throw new BadRequestException(
        `Không thể xóa danh mục này vì còn ${childCount} danh mục con. Hãy xóa hoặc chuyển danh mục con trước`,
      );
    }

    const productCount = await this.productModel.countDocuments({ category: id });
    if (productCount > 0) {
      throw new BadRequestException(
        `Không thể xóa danh mục này vì còn ${productCount} sản phẩm. Hãy xóa hoặc chuyển sản phẩm trước`,
      );
    }

    await this.categoryModel.findByIdAndDelete(id);
  }
}
