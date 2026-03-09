import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryAttribute } from '../schemas/category-attribute.schema';
import { CreateCategoryAttributeDto } from '../dto/category-attributes/create-category-attribute.dto';
import { UpdateCategoryAttributeDto } from '../dto/category-attributes/update-category-attribute.dto';

@Injectable()
export class CategoryAttributesService {
  constructor(
    @InjectModel(CategoryAttribute.name) private categoryAttributeModel: Model<CategoryAttribute>,
  ) {}

  async findByCategory(categoryId: string) {
    return this.categoryAttributeModel
      .find({ category: categoryId })
      .populate('attributeDefinition')
      .exec();
  }

  async assign(dto: CreateCategoryAttributeDto) {
    const existing = await this.categoryAttributeModel
      .findOne({ category: dto.category, attributeDefinition: dto.attributeDefinition })
      .exec();
    if (existing) {
      throw new BadRequestException('This attribute is already assigned to this category');
    }

    const ca = new this.categoryAttributeModel(dto);
    return ca.save();
  }

  async update(id: string, dto: UpdateCategoryAttributeDto) {
    const ca = await this.categoryAttributeModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('attributeDefinition')
      .exec();
    if (!ca) {
      throw new NotFoundException(`Category attribute with ID ${id} not found`);
    }
    return ca;
  }

  async remove(id: string) {
    const ca = await this.categoryAttributeModel.findByIdAndDelete(id).exec();
    if (!ca) {
      throw new NotFoundException(`Category attribute with ID ${id} not found`);
    }
    return { message: 'Attribute removed from category successfully' };
  }

  async removeByKeys(categoryId: string, attrDefId: string) {
    const ca = await this.categoryAttributeModel
      .findOneAndDelete({ category: categoryId, attributeDefinition: attrDefId })
      .exec();
    if (!ca) {
      throw new NotFoundException('Category attribute not found');
    }
    return { message: 'Attribute removed from category successfully' };
  }
}
