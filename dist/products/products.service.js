"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("./schemas/product.schema");
const file_storage_service_1 = require("../utils/file-storage.service");
let ProductsService = class ProductsService {
    constructor(productModel, fileStorage) {
        this.productModel = productModel;
        this.fileStorage = fileStorage;
    }
    async findAll() {
        return this.productModel
            .find()
            .populate('category')
            .populate('brand')
            .exec();
    }
    async findById(id) {
        const product = await this.productModel
            .findById(id)
            .populate('category')
            .populate('brand')
            .exec();
        if (!product) {
            throw new common_1.NotFoundException(`Không tìm thấy sản phẩm với ID: ${id}`);
        }
        return product;
    }
    async findActive() {
        return this.productModel
            .find({ status: product_schema_1.ProductStatus.ACTIVE })
            .populate('category')
            .populate('brand')
            .exec();
    }
    async findByCategory(categoryId) {
        return this.productModel
            .find({ category: new mongoose_2.Types.ObjectId(categoryId) })
            .populate('category')
            .populate('brand')
            .exec();
    }
    async findByCategoryIds(ids) {
        const objectIds = ids.map((id) => new mongoose_2.Types.ObjectId(id));
        return this.productModel
            .find({ category: { $in: objectIds } })
            .populate('category')
            .populate('brand')
            .exec();
    }
    async findByCategoriesIds(ids) {
        return this.findByCategoryIds(ids);
    }
    async findByBrand(brandId) {
        return this.productModel
            .find({ brand: new mongoose_2.Types.ObjectId(brandId) })
            .populate('category')
            .populate('brand')
            .exec();
    }
    async findOutOfStock() {
        return this.productModel
            .find({ status: product_schema_1.ProductStatus.OUT_OF_STOCK })
            .populate('category')
            .populate('brand')
            .exec();
    }
    async findInactive() {
        return this.productModel
            .find({ status: product_schema_1.ProductStatus.INACTIVE })
            .populate('category')
            .populate('brand')
            .exec();
    }
    async searchByName(name) {
        return this.productModel
            .find({ name: { $regex: name, $options: 'i' } })
            .populate('category')
            .populate('brand')
            .exec();
    }
    async findByPriceRange(min, max) {
        return this.productModel
            .find({ price: { $gte: min, $lte: max } })
            .populate('category')
            .populate('brand')
            .exec();
    }
    async filterByNumericSpec(attrKey, minValue, maxValue) {
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
    async create(dto, files = []) {
        const productData = {
            name: dto.name,
            description: dto.description ?? null,
            price: Number(dto.price),
            stockQuantity: Number(dto.stockQuantity),
            status: dto.status ?? product_schema_1.ProductStatus.ACTIVE,
            media: [],
            specifications: [],
            variants: [],
        };
        if (dto.categoryId) {
            productData.category = new mongoose_2.Types.ObjectId(dto.categoryId);
        }
        if (dto.brandId) {
            productData.brand = new mongoose_2.Types.ObjectId(dto.brandId);
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
                };
            });
        }
        await product.save();
        return this.productModel
            .findById(product._id)
            .populate('category')
            .populate('brand')
            .exec();
    }
    async update(id, dto, newFiles = []) {
        const product = await this.findById(id);
        if (dto.name !== undefined)
            product.name = dto.name;
        if (dto.description !== undefined)
            product.description = dto.description;
        if (dto.price !== undefined)
            product.price = Number(dto.price);
        if (dto.stockQuantity !== undefined)
            product.stockQuantity = Number(dto.stockQuantity);
        if (dto.status !== undefined)
            product.status = dto.status;
        if (dto.categoryId !== undefined) {
            product.category = dto.categoryId
                ? new mongoose_2.Types.ObjectId(dto.categoryId)
                : null;
        }
        if (dto.brandId !== undefined) {
            product.brand = dto.brandId
                ? new mongoose_2.Types.ObjectId(dto.brandId)
                : null;
        }
        if (dto.deleteMediaIds && dto.deleteMediaIds.length > 0) {
            const toDelete = product.media.filter((m) => dto.deleteMediaIds.includes(m._id.toString()));
            for (const m of toDelete) {
                this.fileStorage.deleteFile(m.mediaUrl);
            }
            product.media = product.media.filter((m) => !dto.deleteMediaIds.includes(m._id.toString()));
        }
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
                };
            });
            product.media.push(...addedMedia);
        }
        const qty = product.stockQuantity;
        if (qty === 0 && product.status !== product_schema_1.ProductStatus.INACTIVE) {
            product.status = product_schema_1.ProductStatus.OUT_OF_STOCK;
        }
        else if (qty > 0 && product.status === product_schema_1.ProductStatus.OUT_OF_STOCK) {
            product.status = product_schema_1.ProductStatus.ACTIVE;
        }
        await product.save();
        return this.productModel
            .findById(product._id)
            .populate('category')
            .populate('brand')
            .exec();
    }
    async remove(id) {
        const product = await this.findById(id);
        product.status = product_schema_1.ProductStatus.INACTIVE;
        return product.save();
    }
    async markOutOfStock(id) {
        const product = await this.findById(id);
        product.status = product_schema_1.ProductStatus.OUT_OF_STOCK;
        return product.save();
    }
    async restore(id) {
        const product = await this.findById(id);
        product.status = product_schema_1.ProductStatus.ACTIVE;
        return product.save();
    }
    async toggleActive(id) {
        const product = await this.findById(id);
        product.status =
            product.status === product_schema_1.ProductStatus.ACTIVE
                ? product_schema_1.ProductStatus.INACTIVE
                : product_schema_1.ProductStatus.ACTIVE;
        return product.save();
    }
    async getProductMedia(productId) {
        const product = await this.findById(productId);
        return product.media;
    }
    async deleteProductMedia(productId, mediaId) {
        const product = await this.findById(productId);
        const mediaItem = product.media.find((m) => m._id.toString() === mediaId);
        if (!mediaItem) {
            throw new common_1.NotFoundException(`Không tìm thấy media với ID: ${mediaId}`);
        }
        this.fileStorage.deleteFile(mediaItem.mediaUrl);
        product.media = product.media.filter((m) => m._id.toString() !== mediaId);
        return product.save();
    }
    async setPrimaryMedia(productId, mediaId) {
        const product = await this.findById(productId);
        let found = false;
        for (const m of product.media) {
            m.isPrimary = m._id.toString() === mediaId;
            if (m._id.toString() === mediaId)
                found = true;
        }
        if (!found) {
            throw new common_1.NotFoundException(`Không tìm thấy media với ID: ${mediaId}`);
        }
        product.markModified('media');
        return product.save();
    }
    async findProductOrThrow(productId) {
        const product = await this.productModel.findById(productId).exec();
        if (!product) {
            throw new common_1.NotFoundException(`Không tìm thấy sản phẩm với ID: ${productId}`);
        }
        return product;
    }
    async getVariants(productId, onlyActive = false) {
        const product = await this.findProductOrThrow(productId);
        if (onlyActive) {
            return product.variants.filter((v) => v.isActive);
        }
        return product.variants;
    }
    async getVariant(productId, variantId) {
        const product = await this.findProductOrThrow(productId);
        const variant = product.variants.find((v) => v._id.toString() === variantId);
        if (!variant) {
            throw new common_1.NotFoundException(`Không tìm thấy biến thể với ID: ${variantId}`);
        }
        return variant;
    }
    async createVariant(productId, dto) {
        const product = await this.findProductOrThrow(productId);
        const skuExists = product.variants.some((v) => v.sku === dto.sku);
        if (skuExists) {
            throw new common_1.BadRequestException(`SKU "${dto.sku}" đã tồn tại trong sản phẩm này`);
        }
        const newVariant = {
            sku: dto.sku,
            price: Number(dto.price),
            stockQuantity: Number(dto.stockQuantity ?? 0),
            isActive: dto.isActive ?? true,
            displayOrder: dto.displayOrder ?? 0,
            values: (dto.values ?? []).map((v) => ({
                attributeDefinition: v.attrDefId
                    ? new mongoose_2.Types.ObjectId(v.attrDefId)
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
    async updateVariant(productId, variantId, dto) {
        const product = await this.findProductOrThrow(productId);
        const variant = product.variants.find((v) => v._id.toString() === variantId);
        if (!variant) {
            throw new common_1.NotFoundException(`Không tìm thấy biến thể với ID: ${variantId}`);
        }
        if (dto.sku !== undefined) {
            const skuTaken = product.variants.some((v) => v.sku === dto.sku && v._id.toString() !== variantId);
            if (skuTaken) {
                throw new common_1.BadRequestException(`SKU "${dto.sku}" đã tồn tại trong sản phẩm này`);
            }
            variant.sku = dto.sku;
        }
        if (dto.price !== undefined)
            variant.price = Number(dto.price);
        if (dto.stockQuantity !== undefined)
            variant.stockQuantity = Number(dto.stockQuantity);
        if (dto.isActive !== undefined)
            variant.isActive = dto.isActive;
        if (dto.displayOrder !== undefined)
            variant.displayOrder = dto.displayOrder;
        if (dto.values !== undefined) {
            variant.values = dto.values.map((v) => ({
                attributeDefinition: v.attrDefId
                    ? new mongoose_2.Types.ObjectId(v.attrDefId)
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
    async deleteVariant(productId, variantId) {
        const product = await this.findProductOrThrow(productId);
        const idx = product.variants.findIndex((v) => v._id.toString() === variantId);
        if (idx === -1) {
            throw new common_1.NotFoundException(`Không tìm thấy biến thể với ID: ${variantId}`);
        }
        product.variants.splice(idx, 1);
        product.markModified('variants');
        return product.save();
    }
    async getVariantOptions(productId) {
        const product = await this.findProductOrThrow(productId);
        const map = new Map();
        for (const variant of product.variants) {
            for (const val of variant.values) {
                if (!map.has(val.attrKey)) {
                    map.set(val.attrKey, new Set());
                }
                if (val.attrValue != null) {
                    map.get(val.attrKey).add(val.attrValue);
                }
            }
        }
        const result = {};
        for (const [key, valueSet] of map.entries()) {
            result[key] = Array.from(valueSet);
        }
        return result;
    }
    async resolveVariant(productId, selections) {
        const product = await this.findProductOrThrow(productId);
        const selectionKeys = Object.keys(selections);
        const matched = product.variants.find((variant) => selectionKeys.every((key) => variant.values.some((v) => v.attrKey === key && v.attrValue === selections[key])));
        if (!matched) {
            throw new common_1.NotFoundException('Không tìm thấy biến thể phù hợp với lựa chọn đã cung cấp');
        }
        return matched;
    }
    async getVariantMedia(productId, variantId) {
        const variant = await this.getVariant(productId, variantId);
        return variant.media;
    }
    async uploadVariantMedia(productId, variantId, files) {
        const product = await this.findProductOrThrow(productId);
        const variant = product.variants.find((v) => v._id.toString() === variantId);
        if (!variant) {
            throw new common_1.NotFoundException(`Không tìm thấy biến thể với ID: ${variantId}`);
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
            };
        });
        variant.media.push(...addedMedia);
        product.markModified('variants');
        return product.save();
    }
    async deleteVariantMedia(productId, variantId, mediaId) {
        const product = await this.findProductOrThrow(productId);
        const variant = product.variants.find((v) => v._id.toString() === variantId);
        if (!variant) {
            throw new common_1.NotFoundException(`Không tìm thấy biến thể với ID: ${variantId}`);
        }
        const mediaItem = variant.media.find((m) => m._id.toString() === mediaId);
        if (!mediaItem) {
            throw new common_1.NotFoundException(`Không tìm thấy media với ID: ${mediaId}`);
        }
        this.fileStorage.deleteFile(mediaItem.mediaUrl);
        variant.media = variant.media.filter((m) => m._id.toString() !== mediaId);
        product.markModified('variants');
        return product.save();
    }
    async setVariantMediaPrimary(productId, variantId, mediaId) {
        const product = await this.findProductOrThrow(productId);
        const variant = product.variants.find((v) => v._id.toString() === variantId);
        if (!variant) {
            throw new common_1.NotFoundException(`Không tìm thấy biến thể với ID: ${variantId}`);
        }
        let found = false;
        for (const m of variant.media) {
            m.isPrimary = m._id.toString() === mediaId;
            if (m._id.toString() === mediaId)
                found = true;
        }
        if (!found) {
            throw new common_1.NotFoundException(`Không tìm thấy media với ID: ${mediaId}`);
        }
        product.markModified('variants');
        return product.save();
    }
    async getSpecs(productId) {
        const product = await this.findById(productId);
        return product.specifications;
    }
    async addSpec(productId, specData) {
        const product = await this.findProductOrThrow(productId);
        const newSpec = {
            attributeDefinition: specData.attrDefId
                ? new mongoose_2.Types.ObjectId(specData.attrDefId)
                : null,
            specKey: specData.specKey,
            specValue: specData.specValue ?? null,
            valueNumber: specData.valueNumber ?? null,
            displayOrder: specData.displayOrder ?? 0,
        };
        product.specifications.push(newSpec);
        return product.save();
    }
    async updateSpec(productId, specId, specData) {
        const product = await this.findProductOrThrow(productId);
        const spec = product.specifications.find((s) => s._id.toString() === specId);
        if (!spec) {
            throw new common_1.NotFoundException(`Không tìm thấy thông số kỹ thuật với ID: ${specId}`);
        }
        if (specData.attrDefId !== undefined) {
            spec.attributeDefinition = specData.attrDefId
                ? new mongoose_2.Types.ObjectId(specData.attrDefId)
                : null;
        }
        if (specData.specKey !== undefined)
            spec.specKey = specData.specKey;
        if (specData.specValue !== undefined)
            spec.specValue = specData.specValue;
        if (specData.valueNumber !== undefined)
            spec.valueNumber = specData.valueNumber;
        if (specData.displayOrder !== undefined)
            spec.displayOrder = specData.displayOrder;
        product.markModified('specifications');
        return product.save();
    }
    async deleteSpec(productId, specId) {
        const product = await this.findProductOrThrow(productId);
        const idx = product.specifications.findIndex((s) => s._id.toString() === specId);
        if (idx === -1) {
            throw new common_1.NotFoundException(`Không tìm thấy thông số kỹ thuật với ID: ${specId}`);
        }
        product.specifications.splice(idx, 1);
        product.markModified('specifications');
        return product.save();
    }
    async clearSpecs(productId) {
        const product = await this.findProductOrThrow(productId);
        product.specifications = [];
        return product.save();
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        file_storage_service_1.FileStorageService])
], ProductsService);
//# sourceMappingURL=products.service.js.map