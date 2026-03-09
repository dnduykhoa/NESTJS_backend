import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum DataType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  LIST = 'LIST',
}

@Schema({ timestamps: true })
export class AttributeDefinition extends Document {
  @Prop({ required: true, maxlength: 100 })
  name!: string;

  @Prop({ required: true, maxlength: 100 })
  attrKey!: string;

  @Prop({
    required: true,
    enum: DataType,
    type: String,
    default: DataType.STRING,
  })
  dataType!: DataType;

  @Prop({ maxlength: 50 })
  unit?: string;

  @Prop({ default: false })
  isFilterable!: boolean;

  @Prop({ default: false })
  isRequired!: boolean;

  @Prop({ default: 0 })
  displayOrder!: number;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ type: Types.ObjectId, ref: 'AttributeGroup' })
  attributeGroup?: Types.ObjectId;
}

export const AttributeDefinitionSchema = SchemaFactory.createForClass(AttributeDefinition);

AttributeDefinitionSchema.index({ attrKey: 1 }, { unique: true });
AttributeDefinitionSchema.index({ isActive: 1 });
AttributeDefinitionSchema.index({ displayOrder: 1 });
