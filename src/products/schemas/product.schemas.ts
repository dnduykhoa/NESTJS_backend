import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProductMedia, ProductMediaSchema } from './product-media.schema';
import { ProductSpecification, ProductSpecificationSchema } from './product-specification.schema';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true, maxlength: 200, index: true })
  name!: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ required: true, type: Number, min: 0, index: true })
  price!: number;

  @Prop({ required: true, type: Number, min: 0, default: 0 })
  stockQuantity!: number;

  @Prop({ type: Types.ObjectId, ref: 'Category', index: true })
  category?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Brand', index: true })
  brand?: Types.ObjectId;

  @Prop({ type: [ProductMediaSchema], default: [] })
  media!: ProductMedia[];

  @Prop({ type: [ProductSpecificationSchema], default: [] })
  specifications!: ProductSpecification[];

  @Prop({ default: true, index: true })
  isActive?: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.methods.getPrimaryImage = function(): ProductMedia | null {
  return this.media.find(m => m.mediaType === 'IMAGE' && m.isPrimary === true) || null;
};

ProductSchema.methods.getSecondaryImages = function(): ProductMedia[] {
  return this.media.filter(m => m.mediaType === 'IMAGE' && m.isPrimary !== true);
};

ProductSchema.methods.getAllImages = function(): ProductMedia[] {
  return this.media.filter(m => m.mediaType === 'IMAGE');
};

ProductSchema.methods.getVideos = function(): ProductMedia[] {
  return this.media.filter(m => m.mediaType === 'VIDEO');
};

ProductSchema.index({ category: 1, price: 1 });
ProductSchema.index({ name: 'text' });