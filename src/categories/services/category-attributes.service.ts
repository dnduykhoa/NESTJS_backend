import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryAttribute, CategoryAttributeDocument } from '../schemas/category-attribute.schema';
import { CreateCategoryAttributeDto } from '../dto/create-category-attribute.dto';
import { UpdateCategoryAttributeDto } from '../dto/update-category-attribute.dto';

@Injectable()
export class CategoryAttributesService {
  constructor(
    @InjectModel(CategoryAttribute.name)
    private readonly categoryAttributeModel: Model<CategoryAttributeDocument>,
  ) {}

  async getByCategory(categoryId: string): Promise<CategoryAttributeDocument[]> {
    return this.categoryAttributeModel
      .find({ category: categoryId })
      .populate('attributeDefinition')
      .sort({ displayOrder: 1 })
      .exec();
  }

  async assign(dto: CreateCategoryAttributeDto): Promise<CategoryAttributeDocument> {
    const existing = await this.categoryAttributeModel.findOne({
      category: dto.categoryId,
      attributeDefinition: dto.attrDefId,
    });
    if (existing) {
      throw new BadRequestException(
        `Thuộc tính này đã được gán cho danh mục. Không thể gán trùng lặp`,
      );
    }

    return new this.categoryAttributeModel({
      category: dto.categoryId,
      attributeDefinition: dto.attrDefId,
      isRequired: dto.isRequired ?? false,
      displayOrder: dto.displayOrder ?? 0,
    }).save();
  }

  async updateAssignment(id: string, dto: UpdateCategoryAttributeDto): Promise<CategoryAttributeDocument> {
    const assignment = await this.categoryAttributeModel.findById(id);
    if (!assignment) {
      throw new NotFoundException(`Không tìm thấy liên kết thuộc tính-danh mục với ID: ${id}`);
    }

    if (dto.isRequired !== undefined) assignment.isRequired = dto.isRequired;
    if (dto.displayOrder !== undefined) assignment.displayOrder = dto.displayOrder;

    return assignment.save();
  }

  async removeById(id: string): Promise<void> {
    const assignment = await this.categoryAttributeModel.findById(id);
    if (!assignment) {
      throw new NotFoundException(`Không tìm thấy liên kết thuộc tính-danh mục với ID: ${id}`);
    }
    await this.categoryAttributeModel.findByIdAndDelete(id);
  }

  async removeByCategoryAndDef(categoryId: string, attrDefId: string): Promise<void> {
    const assignment = await this.categoryAttributeModel.findOne({
      category: categoryId,
      attributeDefinition: attrDefId,
    });
    if (!assignment) {
      throw new NotFoundException(
        `Không tìm thấy liên kết giữa danh mục ${categoryId} và thuộc tính ${attrDefId}`,
      );
    }
    await this.categoryAttributeModel.findByIdAndDelete(assignment._id);
  }
}
