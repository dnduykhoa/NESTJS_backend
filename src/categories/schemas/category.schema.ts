import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, maxlength: 100, index: true })
  name: string;

  @Prop({ default: null, type: String })
  description: string;

  @Prop({ default: 0, type: Number, index: true })
  displayOrder: number;

  @Prop({ default: true, index: true })
  isActive: boolean;

  // Self-referencing (danh mục cha)
  @Prop({ type: Types.ObjectId, ref: 'Category', default: null })
  parent: Types.ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

// Instance methods
CategorySchema.methods.isRoot = function (): boolean {
  return !this.parent;
};

CategorySchema.methods.getLevel = async function (): Promise<number> {
  let level = 0;
  let current = this;
  while (current.parent) {
    level++;
    const CategoryModel = current.constructor;
    current = await CategoryModel.findById(current.parent);
    if (!current) break;
  }
  return level;
};

CategorySchema.index({ parent: 1 });
CategorySchema.index({ name: 'text' });
CategorySchema.index({ parent: 1, displayOrder: 1 });
