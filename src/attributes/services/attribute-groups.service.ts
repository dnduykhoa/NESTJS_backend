import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AttributeGroup, AttributeGroupDocument } from '../schemas/attribute-group.schema';
import { AttributeDefinition, AttributeDefinitionDocument } from '../schemas/attribute-definition.schema';
import { CreateAttributeGroupDto } from '../dto/create-attribute-group.dto';
import { UpdateAttributeGroupDto } from '../dto/update-attribute-group.dto';

@Injectable()
export class AttributeGroupsService {
  constructor(
    @InjectModel(AttributeGroup.name)
    private readonly attributeGroupModel: Model<AttributeGroupDocument>,
    @InjectModel(AttributeDefinition.name)
    private readonly attributeDefinitionModel: Model<AttributeDefinitionDocument>,
  ) {}

  async getAllGroups(): Promise<AttributeGroupDocument[]> {
    return this.attributeGroupModel.find().sort({ displayOrder: 1, name: 1 }).exec();
  }

  async getActiveGroups(): Promise<AttributeGroupDocument[]> {
    return this.attributeGroupModel
      .find({ isActive: true })
      .sort({ displayOrder: 1, name: 1 })
      .exec();
  }

  async getGroupById(id: string): Promise<AttributeGroupDocument> {
    const group = await this.attributeGroupModel.findById(id).exec();
    if (!group) {
      throw new NotFoundException(`Không tìm thấy nhóm thuộc tính với ID: ${id}`);
    }
    return group;
  }

  async createGroup(dto: CreateAttributeGroupDto): Promise<AttributeGroupDocument> {
    const existing = await this.attributeGroupModel.findOne({ name: dto.name }).exec();
    if (existing) {
      throw new BadRequestException(`Đã tồn tại nhóm thuộc tính với tên: ${dto.name}`);
    }

    const group = new this.attributeGroupModel({
      ...dto,
      displayOrder: dto.displayOrder ?? 0,
      isActive: dto.isActive ?? true,
    });

    return group.save();
  }

  async updateGroup(id: string, dto: UpdateAttributeGroupDto): Promise<AttributeGroupDocument> {
    const group = await this.getGroupById(id);

    if (dto.name && dto.name !== group.name) {
      const existing = await this.attributeGroupModel.findOne({ name: dto.name }).exec();
      if (existing) {
        throw new BadRequestException(`Đã tồn tại nhóm thuộc tính với tên: ${dto.name}`);
      }
    }

    Object.assign(group, dto);
    return group.save();
  }

  async deleteGroup(id: string): Promise<void> {
    await this.getGroupById(id);

    const definitionCount = await this.attributeDefinitionModel
      .countDocuments({ attributeGroup: new Types.ObjectId(id) })
      .exec();

    if (definitionCount > 0) {
      throw new BadRequestException(
        `Không thể xóa nhóm thuộc tính này vì còn ${definitionCount} định nghĩa thuộc tính. Hãy xóa hoặc chuyển các thuộc tính trước`,
      );
    }

    await this.attributeGroupModel.findByIdAndDelete(id).exec();
  }
}
