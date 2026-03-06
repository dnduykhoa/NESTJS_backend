import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProductMedia, ProductMediaSchema } from './product-media.schema';
import { ProductSpecification, ProductSpecificationSchema } from './product-specification.schema';

// Định nghĩa Interface cho Methods để TypeScript không báo lỗi
export interface ProductMethods {
  getPrimaryImage(): ProductMedia | null;
  getSecondaryImages(): ProductMedia[];
  getAllImages(): ProductMedia[];
  getVideos(): ProductMedia[];
}

export type ProductDocument = Product & Document & ProductMethods;

@Schema({ timestamps: true, collection: 'products' })
export class Product {
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

  // Sử dụng Schema con đã import
  @Prop({ type: [ProductMediaSchema], default: [] })
  media!: ProductMedia[];

  @Prop({ type: [ProductSpecificationSchema], default: [] })
  specifications!: ProductSpecification[];

  @Prop({ default: true, index: true })
  isActive?: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// --- Cài đặt Methods ---
ProductSchema.methods.getPrimaryImage = function(this: ProductDocument): ProductMedia | null {
  return this.media.find(m => m.mediaType === 'IMAGE' && m.isPrimary === true) || null;
};

ProductSchema.methods.getSecondaryImages = function(this: ProductDocument): ProductMedia[] {
  return this.media.filter(m => m.mediaType === 'IMAGE' && m.isPrimary !== true);
};

ProductSchema.methods.getAllImages = function(this: ProductDocument): ProductMedia[] {
  return this.media.filter(m => m.mediaType === 'IMAGE');
};

ProductSchema.methods.getVideos = function(this: ProductDocument): ProductMedia[] {
  return this.media.filter(m => m.mediaType === 'VIDEO');
};

// --- Indexes ---
ProductSchema.index({ category: 1, price: 1 });
ProductSchema.index({ name: 'text' });