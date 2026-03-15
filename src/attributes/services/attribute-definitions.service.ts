import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AttributeDefinition, AttributeDefinitionDocument } from '../schemas/attribute-definition.schema';
import { AttributeGroup, AttributeGroupDocument } from '../schemas/attribute-group.schema';
import { CreateAttributeDefinitionDto } from '../dto/create-attribute-definition.dto';
import { UpdateAttributeDefinitionDto } from '../dto/update-attribute-definition.dto';

@Injectable()
export class AttributeDefinitionsService {
  constructor(
    @InjectModel(AttributeDefinition.name)
    private readonly attributeDefinitionModel: Model<AttributeDefinitionDocument>,
    @InjectModel(AttributeGroup.name)
    private readonly attributeGroupModel: Model<AttributeGroupDocument>,
  ) {}

  async getAllDefinitions(): Promise<AttributeDefinitionDocument[]> {
    return this.attributeDefinitionModel
      .find()
      .populate('attributeGroup')
      .sort({ displayOrder: 1, name: 1 })
      .exec();
  }

  async getActiveDefinitions(): Promise<AttributeDefinitionDocument[]> {
    return this.attributeDefinitionModel
      .find({ isActive: true })
      .populate('attributeGroup')
      .sort({ displayOrder: 1, name: 1 })
      .exec();
  }

  async getFilterableDefinitions(): Promise<AttributeDefinitionDocument[]> {
    return this.attributeDefinitionModel
      .find({ isFilterable: true })
      .populate('attributeGroup')
      .sort({ displayOrder: 1, name: 1 })
      .exec();
  }

  async getDefinitionsByGroup(groupId: string): Promise<AttributeDefinitionDocument[]> {
    return this.attributeDefinitionModel
      .find({ attributeGroup: new Types.ObjectId(groupId) })
      .populate('attributeGroup')
      .sort({ displayOrder: 1, name: 1 })
      .exec();
  }

  async getDefinitionById(id: string): Promise<AttributeDefinitionDocument> {
    const definition = await this.attributeDefinitionModel
      .findById(id)
      .populate('attributeGroup')
      .exec();
    if (!definition) {
      throw new NotFoundException(`Không tìm thấy định nghĩa thuộc tính với ID: ${id}`);
    }
    return definition;
  }

  async getDefinitionByKey(attrKey: string): Promise<AttributeDefinitionDocument | null> {
    return this.attributeDefinitionModel
      .findOne({ attrKey })
      .populate('attributeGroup')
      .exec();
  }

  async createDefinition(dto: CreateAttributeDefinitionDto): Promise<AttributeDefinitionDocument> {
    const existing = await this.attributeDefinitionModel.findOne({ attrKey: dto.attrKey }).exec();
    if (existing) {
      throw new BadRequestException(`Đã tồn tại định nghĩa thuộc tính với khóa: ${dto.attrKey}`);
    }

    let attributeGroup: Types.ObjectId | null = null;
    if (dto.groupId) {
      const group = await this.attributeGroupModel.findById(dto.groupId).exec();
      if (!group) {
        throw new NotFoundException(`Không tìm thấy nhóm thuộc tính với ID: ${dto.groupId}`);
      }
      attributeGroup = new Types.ObjectId(dto.groupId);
    }

    const { groupId, ...rest } = dto;
    const definition = new this.attributeDefinitionModel({
      ...rest,
      attributeGroup,
      displayOrder: dto.displayOrder ?? 0,
      isActive: dto.isActive ?? true,
      isFilterable: dto.isFilterable ?? false,
      isRequired: dto.isRequired ?? false,
    });

    return definition.save();
  }

  async updateDefinition(
    id: string,
    dto: UpdateAttributeDefinitionDto,
  ): Promise<AttributeDefinitionDocument> {
    const definition = await this.getDefinitionById(id);

    if (dto.attrKey && dto.attrKey !== definition.attrKey) {
      const existing = await this.attributeDefinitionModel
        .findOne({ attrKey: dto.attrKey })
        .exec();
      if (existing) {
        throw new BadRequestException(`Đã tồn tại định nghĩa thuộc tính với khóa: ${dto.attrKey}`);
      }
    }

    const { groupId, ...rest } = dto;

    if (groupId !== undefined) {
      if (groupId === null) {
        (definition as any).attributeGroup = null;
      } else {
        const group = await this.attributeGroupModel.findById(groupId).exec();
        if (!group) {
          throw new NotFoundException(`Không tìm thấy nhóm thuộc tính với ID: ${groupId}`);
        }
        (definition as any).attributeGroup = new Types.ObjectId(groupId);
      }
    }

    Object.assign(definition, rest);
    return definition.save();
  }

  async deleteDefinition(id: string): Promise<void> {
    const definition = await this.getDefinitionById(id);
    await this.attributeDefinitionModel.findByIdAndDelete(definition._id).exec();
  }
}
