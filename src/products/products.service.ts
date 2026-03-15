import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Product,
  ProductDocument,
  ProductStatus,
} from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  CreateProductVariantDto,
  UpdateProductVariantDto,
} from './dto/product-variant.dto';
import { FileStorageService } from '../utils/file-storage.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    private readonly fileStorage: FileStorageService,
  ) {}

  // ─── Core Queries ────────────────────────────────────────────────────────────

  async findAll(): Promise<ProductDocument[]> {
    return this.productModel
      .find()
      .populate('category')
      .populate('brand')
      .exec();
  }

  async findById(id: string): Promise<ProductDocument> {
    const product = await this.productModel
      .findById(id)
      .populate('category')
      .populate('brand')
      .exec();
    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm với ID: ${id}`);
    }
    return product;
  }

  async findActive(): Promise<ProductDocument[]> {
    return this.productModel
      .find({ status: ProductStatus.ACTIVE })
      .populate('category')
      .populate('brand')
      .exec();
  }

  async findByCategory(categoryId: string): Promise<ProductDocument[]> {
    return this.productModel
      .find({ category: new Types.ObjectId(categoryId) })
      .populate('category')
      .populate('brand')
      .exec();
  }

  async findByCategoryIds(ids: string[]): Promise<ProductDocument[]> {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    return this.productModel
      .find({ category: { $in: objectIds } })
      .populate('category')
      .populate('brand')
      .exec();
  }

  /** Alias kept for controller compatibility */
  async findByCategoriesIds(ids: string[]): Promise<ProductDocument[]> {
    return this.findByCategoryIds(ids);
  }

  async findByBrand(brandId: string): Promise<ProductDocument[]> {
    return this.productModel
      .find({ brand: new Types.ObjectId(brandId) })
      .populate('category')
      .populate('brand')
      .exec();
  }

  async findOutOfStock(): Promise<ProductDocument[]> {
    return this.productModel
      .find({ status: ProductStatus.OUT_OF_STOCK })
      .populate('category')
      .populate('brand')
      .exec();
  }

  async findInactive(): Promise<ProductDocument[]> {
    return this.productModel
      .find({ status: ProductStatus.INACTIVE })
      .populate('category')
      .populate('brand')
      .exec();
  }

  async searchByName(name: string): Promise<ProductDocument[]> {
    return this.productModel
      .find({ name: { $regex: name, $options: 'i' } })
      .populate('category')
      .populate('brand')
      .exec();
  }

  async findByPriceRange(min: number, max: number): Promise<ProductDocument[]> {
    return this.productModel
      .find({ price: { $gte: min, $lte: max } })
      .populate('category')
      .populate('brand')
      .exec();
  }

  /**
   * Filter products where specifications contains an entry with
   * specKey = attrKey AND valueNumber between minValue and maxValue.
   */
  async filterByNumericSpec(
    attrKey: string,
    minValue: number,
    maxValue: number,
  ): Promise<ProductDocument[]> {
    return this.productModel
      .find({
        specifications: {
          $elemMatch: {
            specKey: attrKey,
            valueNumber: { $gte: minValue, $lte: maxValue },
          },
        },
      })
      .populate('category')
      .populate('brand')
      .exec();
  }

  // ─── Create ──────────────────────────────────────────────────────────────────

  async create(
    dto: CreateProductDto,
    files: Express.Multer.File[] = [],
  ): Promise<ProductDocument> {
    const productData: Record<string, any> = {
      name: dto.name,
      description: dto.description ?? null,
      price: Number(dto.price),
      stockQuantity: Number(dto.stockQuantity),
      status: dto.status ?? ProductStatus.ACTIVE,
      media: [],
      specifications: [],
      variants: [],
    };

    if (dto.categoryId) {
      productData.category = new Types.ObjectId(dto.categoryId);
    }
    if (dto.brandId) {
      productData.brand = new Types.ObjectId(dto.brandId);
    }

    const product = new this.productModel(productData);

    if (files && files.length > 0) {
      product.media = files.map((file, index) => {
        const mediaUrl = this.fileStorage.storeFile(file, 'products');
        const mediaType = this.fileStorage.isVideoFile(file) ? 'VIDEO' : 'IMAGE';
        return {
          mediaUrl,
          mediaType,
          isPrimary: index === 0,
          displayOrder: index,
          altText: null,
        } as any;
      });
    }

    await product.save();

    // Re-fetch with population for a clean populated response
    return this.productModel
      .findById(product._id)
      .populate('category')
      .populate('brand')
      .exec() as Promise<ProductDocument>;
  }

  // ─── Update ──────────────────────────────────────────────────────────────────

  async update(
    id: string,
    dto: UpdateProductDto,
    newFiles: Express.Multer.File[] = [],
  ): Promise<ProductDocument> {
    const product = await this.findById(id);

    // Scalar field updates
    if (dto.name !== undefined) product.name = dto.name;
    if (dto.description !== undefined) product.description = dto.description;
    if (dto.price !== undefined) product.price = Number(dto.price);
    if (dto.stockQuantity !== undefined)
      product.stockQuantity = Number(dto.stockQuantity);
    if (dto.status !== undefined) product.status = dto.status;

    if (dto.categoryId !== undefined) {
      (product as any).category = dto.categoryId
        ? new Types.ObjectId(dto.categoryId)
        : null;
    }
    if (dto.brandId !== undefined) {
      (product as any).brand = dto.brandId
        ? new Types.ObjectId(dto.brandId)
        : null;
    }

    // Handle media deletion
    if (dto.deleteMediaIds && dto.deleteMediaIds.length > 0) {
      const toDelete = product.media.filter((m) =>
        dto.deleteMediaIds!.includes((m as any)._id.toString()),
      );
      for (const m of toDelete) {
        this.fileStorage.deleteFile(m.mediaUrl);
      }
      product.media = product.media.filter(
        (m) => !dto.deleteMediaIds!.includes((m as any)._id.toString()),
      );
    }

    // Append new media files
    if (newFiles && newFiles.length > 0) {
      const existingCount = product.media.length;
      const addedMedia = newFiles.map((file, index) => {
        const mediaUrl = this.fileStorage.storeFile(file, 'products');
        const mediaType = this.fileStorage.isVideoFile(file) ? 'VIDEO' : 'IMAGE';
        return {
          mediaUrl,
          mediaType,
          isPrimary: existingCount === 0 && index === 0,
          displayOrder: existingCount + index,
          altText: null,
        } as any;
      });
      product.media.push(...addedMedia);
    }

    // Auto-sync status based on stockQuantity
    const qty = product.stockQuantity;
    if (qty === 0 && product.status !== ProductStatus.INACTIVE) {
      product.status = ProductStatus.OUT_OF_STOCK;
    } else if (qty > 0 && product.status === ProductStatus.OUT_OF_STOCK) {
      product.status = ProductStatus.ACTIVE;
    }

    await product.save();

    return this.productModel
      .findById(product._id)
      .populate('category')
      .populate('brand')
      .exec() as Promise<ProductDocument>;
  }

  // ─── Status transitions ───────────────────────────────────────────────────────

  /** Soft-delete: sets status to INACTIVE without removing the document */
  async remove(id: string): Promise<ProductDocument> {
    const product = await this.findById(id);
    product.status = ProductStatus.INACTIVE;
    return product.save();
  }

  async markOutOfStock(id: string): Promise<ProductDocument> {
    const product = await this.findById(id);
    product.status = ProductStatus.OUT_OF_STOCK;
    return product.save();
  }

  async restore(id: string): Promise<ProductDocument> {
    const product = await this.findById(id);
    product.status = ProductStatus.ACTIVE;
    return product.save();
  }

  async toggleActive(id: string): Promise<ProductDocument> {
    const product = await this.findById(id);
    product.status =
      product.status === ProductStatus.ACTIVE
        ? ProductStatus.INACTIVE
        : ProductStatus.ACTIVE;
    return product.save();
  }

  // ─── Product Media ────────────────────────────────────────────────────────────

  async getProductMedia(productId: string) {
    const product = await this.findById(productId);
    return product.media;
  }

  async deleteProductMedia(
    productId: string,
    mediaId: string,
  ): Promise<ProductDocument> {
    const product = await this.findById(productId);
    const mediaItem = product.media.find(
      (m) => (m as any)._id.toString() === mediaId,
    );
    if (!mediaItem) {
      throw new NotFoundException(`Không tìm thấy media với ID: ${mediaId}`);
    }
    this.fileStorage.deleteFile(mediaItem.mediaUrl);
    product.media = product.media.filter(
      (m) => (m as any)._id.toString() !== mediaId,
    );
    return product.save();
  }

  async setPrimaryMedia(
    productId: string,
    mediaId: string,
  ): Promise<ProductDocument> {
    const product = await this.findById(productId);
    let found = false;
    for (const m of product.media) {
      (m as any).isPrimary = (m as any)._id.toString() === mediaId;
      if ((m as any)._id.toString() === mediaId) found = true;
    }
    if (!found) {
      throw new NotFoundException(`Không tìm thấy media với ID: ${mediaId}`);
    }
    product.markModified('media');
    return product.save();
  }

  // ─── Internal helper ─────────────────────────────────────────────────────────

  /**
   * Find a product without populating refs (used for embedded-array operations).
   */
  private async findProductOrThrow(productId: string): Promise<ProductDocument> {
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException(
        `Không tìm thấy sản phẩm với ID: ${productId}`,
      );
    }
    return product;
  }

  // ─── Variants ─────────────────────────────────────────────────────────────────

  async getVariants(productId: string, onlyActive = false) {
    const product = await this.findProductOrThrow(productId);
    if (onlyActive) {
      return product.variants.filter((v) => v.isActive);
    }
    return product.variants;
  }

  async getVariant(productId: string, variantId: string) {
    const product = await this.findProductOrThrow(productId);
    const variant = product.variants.find(
      (v) => (v as any)._id.toString() === variantId,
    );
    if (!variant) {
      throw new NotFoundException(
        `Không tìm thấy biến thể với ID: ${variantId}`,
      );
    }
    return variant;
  }

  async createVariant(
    productId: string,
    dto: CreateProductVariantDto,
  ): Promise<ProductDocument> {
    const product = await this.findProductOrThrow(productId);

    const skuExists = product.variants.some((v) => v.sku === dto.sku);
    if (skuExists) {
      throw new BadRequestException(
        `SKU "${dto.sku}" đã tồn tại trong sản phẩm này`,
      );
    }

    const newVariant: any = {
      sku: dto.sku,
      price: Number(dto.price),
      stockQuantity: Number(dto.stockQuantity ?? 0),
      isActive: dto.isActive ?? true,
      displayOrder: dto.displayOrder ?? 0,
      values: (dto.values ?? []).map((v) => ({
        attributeDefinition: v.attrDefId
          ? new Types.ObjectId(v.attrDefId)
          : null,
        attrKey: v.attrKey,
        attrValue: v.attrValue ?? null,
        valueNumber: v.valueNumber ?? null,
        displayOrder: v.displayOrder ?? 0,
      })),
      media: [],
    };

    product.variants.push(newVariant);
    return product.save();
  }

  async updateVariant(
    productId: string,
    variantId: string,
    dto: UpdateProductVariantDto,
  ): Promise<ProductDocument> {
    const product = await this.findProductOrThrow(productId);
    const variant = product.variants.find(
      (v) => (v as any)._id.toString() === variantId,
    );
    if (!variant) {
      throw new NotFoundException(
        `Không tìm thấy biến thể với ID: ${variantId}`,
      );
    }

    if (dto.sku !== undefined) {
      const skuTaken = product.variants.some(
        (v) =>
          v.sku === dto.sku && (v as any)._id.toString() !== variantId,
      );
      if (skuTaken) {
        throw new BadRequestException(
          `SKU "${dto.sku}" đã tồn tại trong sản phẩm này`,
        );
      }
      variant.sku = dto.sku;
    }
    if (dto.price !== undefined) variant.price = Number(dto.price);
    if (dto.stockQuantity !== undefined)
      variant.stockQuantity = Number(dto.stockQuantity);
    if (dto.isActive !== undefined) variant.isActive = dto.isActive;
    if (dto.displayOrder !== undefined) variant.displayOrder = dto.displayOrder;

    if (dto.values !== undefined) {
      (variant as any).values = dto.values.map((v) => ({
        attributeDefinition: v.attrDefId
          ? new Types.ObjectId(v.attrDefId)
          : null,
        attrKey: v.attrKey,
        attrValue: v.attrValue ?? null,
        valueNumber: v.valueNumber ?? null,
        displayOrder: v.displayOrder ?? 0,
      }));
    }

    product.markModified('variants');
    return product.save();
  }

  async deleteVariant(
    productId: string,
    variantId: string,
  ): Promise<ProductDocument> {
    const product = await this.findProductOrThrow(productId);
    const idx = product.variants.findIndex(
      (v) => (v as any)._id.toString() === variantId,
    );
    if (idx === -1) {
      throw new NotFoundException(
        `Không tìm thấy biến thể với ID: ${variantId}`,
      );
    }
    product.variants.splice(idx, 1);
    product.markModified('variants');
    return product.save();
  }

  /**
   * Returns a map of attrKey → unique attrValues from all variants.
   * Example: { "color": ["Đen", "Trắng"], "storage": ["128GB", "256GB"] }
   */
  async getVariantOptions(
    productId: string,
  ): Promise<Record<string, string[]>> {
    const product = await this.findProductOrThrow(productId);
    const map = new Map<string, Set<string>>();

    for (const variant of product.variants) {
      for (const val of variant.values) {
        if (!map.has(val.attrKey)) {
          map.set(val.attrKey, new Set());
        }
        if (val.attrValue != null) {
          map.get(val.attrKey)!.add(val.attrValue);
        }
      }
    }

    const result: Record<string, string[]> = {};
    for (const [key, valueSet] of map.entries()) {
      result[key] = Array.from(valueSet);
    }
    return result;
  }

  /**
   * Finds the first variant where all selections match.
   * selections: { "color": "Đen", "storage": "256GB" }
   */
  async resolveVariant(
    productId: string,
    selections: Record<string, string>,
  ) {
    const product = await this.findProductOrThrow(productId);
    const selectionKeys = Object.keys(selections);

    const matched = product.variants.find((variant) =>
      selectionKeys.every((key) =>
        variant.values.some(
          (v) => v.attrKey === key && v.attrValue === selections[key],
        ),
      ),
    );

    if (!matched) {
      throw new NotFoundException(
        'Không tìm thấy biến thể phù hợp với lựa chọn đã cung cấp',
      );
    }
    return matched;
  }

  // ─── Variant Media ────────────────────────────────────────────────────────────

  async getVariantMedia(productId: string, variantId: string) {
    const variant = await this.getVariant(productId, variantId);
    return variant.media;
  }

  async uploadVariantMedia(
    productId: string,
    variantId: string,
    files: Express.Multer.File[],
  ): Promise<ProductDocument> {
    const product = await this.findProductOrThrow(productId);
    const variant = product.variants.find(
      (v) => (v as any)._id.toString() === variantId,
    );
    if (!variant) {
      throw new NotFoundException(
        `Không tìm thấy biến thể với ID: ${variantId}`,
      );
    }

    const existingCount = variant.media.length;
    const addedMedia = files.map((file, index) => {
      const mediaUrl = this.fileStorage.storeFile(file, 'products');
      const mediaType = this.fileStorage.isVideoFile(file) ? 'VIDEO' : 'IMAGE';
      return {
        mediaUrl,
        mediaType,
        isPrimary: existingCount === 0 && index === 0,
        displayOrder: existingCount + index,
        altText: null,
      } as any;
    });

    variant.media.push(...addedMedia);
    product.markModified('variants');
    return product.save();
  }

  async deleteVariantMedia(
    productId: string,
    variantId: string,
    mediaId: string,
  ): Promise<ProductDocument> {
    const product = await this.findProductOrThrow(productId);
    const variant = product.variants.find(
      (v) => (v as any)._id.toString() === variantId,
    );
    if (!variant) {
      throw new NotFoundException(
        `Không tìm thấy biến thể với ID: ${variantId}`,
      );
    }

    const mediaItem = variant.media.find(
      (m) => (m as any)._id.toString() === mediaId,
    );
    if (!mediaItem) {
      throw new NotFoundException(`Không tìm thấy media với ID: ${mediaId}`);
    }

    this.fileStorage.deleteFile(mediaItem.mediaUrl);
    variant.media = variant.media.filter(
      (m) => (m as any)._id.toString() !== mediaId,
    );
    product.markModified('variants');
    return product.save();
  }

  async setVariantMediaPrimary(
    productId: string,
    variantId: string,
    mediaId: string,
  ): Promise<ProductDocument> {
    const product = await this.findProductOrThrow(productId);
    const variant = product.variants.find(
      (v) => (v as any)._id.toString() === variantId,
    );
    if (!variant) {
      throw new NotFoundException(
        `Không tìm thấy biến thể với ID: ${variantId}`,
      );
    }

    let found = false;
    for (const m of variant.media) {
      (m as any).isPrimary = (m as any)._id.toString() === mediaId;
      if ((m as any)._id.toString() === mediaId) found = true;
    }
    if (!found) {
      throw new NotFoundException(`Không tìm thấy media với ID: ${mediaId}`);
    }

    product.markModified('variants');
    return product.save();
  }

  // ─── Specifications ───────────────────────────────────────────────────────────

  async getSpecs(productId: string) {
    const product = await this.findById(productId);
    return product.specifications;
  }

  async addSpec(
    productId: string,
    specData: {
      attrDefId?: string;
      specKey: string;
      specValue?: string;
      valueNumber?: number;
      displayOrder?: number;
    },
  ): Promise<ProductDocument> {
    const product = await this.findProductOrThrow(productId);

    const newSpec: any = {
      attributeDefinition: specData.attrDefId
        ? new Types.ObjectId(specData.attrDefId)
        : null,
      specKey: specData.specKey,
      specValue: specData.specValue ?? null,
      valueNumber: specData.valueNumber ?? null,
      displayOrder: specData.displayOrder ?? 0,
    };

    product.specifications.push(newSpec);
    return product.save();
  }

  async updateSpec(
    productId: string,
    specId: string,
    specData: {
      attrDefId?: string;
      specKey?: string;
      specValue?: string;
      valueNumber?: number;
      displayOrder?: number;
    },
  ): Promise<ProductDocument> {
    const product = await this.findProductOrThrow(productId);
    const spec = product.specifications.find(
      (s) => (s as any)._id.toString() === specId,
    );
    if (!spec) {
      throw new NotFoundException(
        `Không tìm thấy thông số kỹ thuật với ID: ${specId}`,
      );
    }

    if (specData.attrDefId !== undefined) {
      (spec as any).attributeDefinition = specData.attrDefId
        ? new Types.ObjectId(specData.attrDefId)
        : null;
    }
    if (specData.specKey !== undefined) spec.specKey = specData.specKey;
    if (specData.specValue !== undefined) spec.specValue = specData.specValue;
    if (specData.valueNumber !== undefined)
      spec.valueNumber = specData.valueNumber;
    if (specData.displayOrder !== undefined)
      spec.displayOrder = specData.displayOrder;

    product.markModified('specifications');
    return product.save();
  }

  async deleteSpec(
    productId: string,
    specId: string,
  ): Promise<ProductDocument> {
    const product = await this.findProductOrThrow(productId);
    const idx = product.specifications.findIndex(
      (s) => (s as any)._id.toString() === specId,
    );
    if (idx === -1) {
      throw new NotFoundException(
        `Không tìm thấy thông số kỹ thuật với ID: ${specId}`,
      );
    }
    product.specifications.splice(idx, 1);
    product.markModified('specifications');
    return product.save();
  }

  async clearSpecs(productId: string): Promise<ProductDocument> {
    const product = await this.findProductOrThrow(productId);
    product.specifications = [];
    return product.save();
  }
}
