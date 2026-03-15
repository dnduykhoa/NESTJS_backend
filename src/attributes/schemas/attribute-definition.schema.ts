import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AttributeDefinitionDocument = AttributeDefinition & Document;

export enum DataType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  LIST = 'LIST',
}

@Schema({ timestamps: true })
export class AttributeDefinition {
  @Prop({ required: true, maxlength: 100 })
  name: string; // VD: "RAM", "CPU", "Kích thước màn hình"

  @Prop({ required: true, unique: true, maxlength: 100 })
  attrKey: string; // VD: "ram", "cpu", "screen_size"

  @Prop({
    type: String,
    enum: DataType,
    default: DataType.STRING,
  })
  dataType: DataType;

  @Prop({ default: null, maxlength: 50 })
  unit: string; // VD: "GB", "GHz", "inch"

  @Prop({ default: false })
  isFilterable: boolean;

  @Prop({ default: false })
  isRequired: boolean;

  @Prop({ default: 0, type: Number })
  displayOrder: number;

  @Prop({ default: true })
  isActive: boolean;

  // Nhóm thuộc tính chứa định nghĩa này
  @Prop({ type: Types.ObjectId, ref: 'AttributeGroup', default: null })
  attributeGroup: Types.ObjectId;
}

export const AttributeDefinitionSchema = SchemaFactory.createForClass(AttributeDefinition);
AttributeDefinitionSchema.index({ attrKey: 1 });
AttributeDefinitionSchema.index({ isFilterable: 1 });
AttributeDefinitionSchema.index({ attributeGroup: 1 });
