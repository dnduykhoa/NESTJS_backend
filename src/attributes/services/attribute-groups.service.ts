import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AttributeGroup } from '../schemas/attribute-group.schema';
import { CreateAttributeGroupDto } from '../dto/group/create-attribute-group.dto';
import { UpdateAttributeGroupDto } from '../dto/group/update-attribute-group.dto';

@Injectable()
export class AttributeGroupsService {
  constructor(
    @InjectModel(AttributeGroup.name) private attributeGroupModel: Model<AttributeGroup>,
    @InjectModel('AttributeDefinition') private attributeDefinitionModel: Model<any>,
  ) {}

  async create(dto: CreateAttributeGroupDto) {
    const group = new this.attributeGroupModel(dto);
    return group.save();
  }

  async findAll() {
    return this.attributeGroupModel.find().exec();
  }

  async findActive() {
    return this.attributeGroupModel.find({ isActive: true }).exec();
  }

  async findOne(id: string) {
    const group = await this.attributeGroupModel.findById(id).exec();
    if (!group) {
      throw new NotFoundException(`Attribute group with ID ${id} not found`);
    }
    return group;
  }

  async update(id: string, dto: UpdateAttributeGroupDto) {
    const group = await this.attributeGroupModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!group) {
      throw new NotFoundException(`Attribute group with ID ${id} not found`);
    }
    return group;
  }

  async remove(id: string) {
    const defCount = await this.attributeDefinitionModel.countDocuments({ attributeGroup: id }).exec();
    if (defCount > 0) {
      throw new BadRequestException(
        `Cannot delete this group because it has ${defCount} attribute definitions. Please delete or reassign them first.`
      );
    }

    const group = await this.attributeGroupModel.findByIdAndDelete(id).exec();
    if (!group) {
      throw new NotFoundException(`Attribute group with ID ${id} not found`);
    }
    return { message: 'Attribute group deleted successfully', group };
  }
}
