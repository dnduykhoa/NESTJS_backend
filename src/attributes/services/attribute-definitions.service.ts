import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AttributeDefinition } from '../schemas/attribute-definition.schema';
import { CreateAttributeDefinitionDto } from '../dto/definition/create-attribute-definition.dto';
import { UpdateAttributeDefinitionDto } from '../dto/definition/update-attribute-definition.dto';

@Injectable()
export class AttributeDefinitionsService {
  constructor(
    @InjectModel(AttributeDefinition.name) private attributeDefinitionModel: Model<AttributeDefinition>,
    @InjectModel('CategoryAttribute') private categoryAttributeModel: Model<any>,
  ) {}

  async create(dto: CreateAttributeDefinitionDto) {
    const def = new this.attributeDefinitionModel(dto);
    return def.save();
  }

  async findAll() {
    return this.attributeDefinitionModel.find().populate('attributeGroup').exec();
  }

  async findActive() {
    return this.attributeDefinitionModel.find({ isActive: true }).populate('attributeGroup').exec();
  }

  async findFilterable() {
    return this.attributeDefinitionModel.find({ isFilterable: true }).populate('attributeGroup').exec();
  }

  async findByGroup(groupId: string) {
    return this.attributeDefinitionModel.find({ attributeGroup: groupId }).exec();
  }

  async findOne(id: string) {
    const def = await this.attributeDefinitionModel.findById(id).populate('attributeGroup').exec();
    if (!def) {
      throw new NotFoundException(`Attribute definition with ID ${id} not found`);
    }
    return def;
  }

  async findByKey(attrKey: string) {
    const def = await this.attributeDefinitionModel.findOne({ attrKey }).populate('attributeGroup').exec();
    if (!def) {
      throw new NotFoundException(`Attribute definition with key ${attrKey} not found`);
    }
    return def;
  }

  async update(id: string, dto: UpdateAttributeDefinitionDto) {
    const def = await this.attributeDefinitionModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('attributeGroup')
      .exec();
    if (!def) {
      throw new NotFoundException(`Attribute definition with ID ${id} not found`);
    }
    return def;
  }

  async remove(id: string) {
    const caCount = await this.categoryAttributeModel.countDocuments({ attributeDefinition: id }).exec();
    if (caCount > 0) {
      throw new BadRequestException(
        `Cannot delete this attribute definition because it is used in ${caCount} category attributes. Please remove them first.`
      );
    }

    const def = await this.attributeDefinitionModel.findByIdAndDelete(id).exec();
    if (!def) {
      throw new NotFoundException(`Attribute definition with ID ${id} not found`);
    }
    return { message: 'Attribute definition deleted successfully', definition: def };
  }
}
