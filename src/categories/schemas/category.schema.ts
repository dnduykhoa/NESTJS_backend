import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ required: true, maxlength: 100, index: true })
  name!: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ default: 0, type: Number, index: true })
  displayOrder?: number;

  @Prop({ default: true, index: true })
  isActive?: boolean;

  // Danh mục cha (null nếu là danh mục gốc)
  @Prop({ type: Types.ObjectId, ref: 'Category', default: null })
  parent?: Types.ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.methods.isRoot = function(): boolean {
  return this.parent == null;
};

CategorySchema.methods.getLevel = async function(): Promise<number> {
  let level = 0;
  let currentParentId = this.parent;
  const model = this.constructor as any;
  
  while (currentParentId != null) {
    level++;
    const parentCategory = await model.findById(currentParentId).exec();
    if (!parentCategory) break;
    currentParentId = parentCategory.parent;
  }
  
  return level;
};

CategorySchema.index({ parent: 1 });
CategorySchema.index({ name: 'text' });
CategorySchema.index({ parent: 1, displayOrder: 1 });
