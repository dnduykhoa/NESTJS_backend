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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = exports.Product = exports.ProductStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_media_schema_1 = require("./product-media.schema");
const product_specification_schema_1 = require("./product-specification.schema");
const product_variant_schema_1 = require("./product-variant.schema");
var ProductStatus;
(function (ProductStatus) {
    ProductStatus["ACTIVE"] = "ACTIVE";
    ProductStatus["INACTIVE"] = "INACTIVE";
    ProductStatus["OUT_OF_STOCK"] = "OUT_OF_STOCK";
})(ProductStatus || (exports.ProductStatus = ProductStatus = {}));
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, mongoose_1.Prop)({ required: true, maxlength: 200, index: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, type: String }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 0, index: true }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 0, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "stockQuantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Category', default: null, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Product.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Brand', default: null, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Product.prototype, "brand", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [product_media_schema_1.ProductMediaSchema], default: [] }),
    __metadata("design:type", Array)
], Product.prototype, "media", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [product_specification_schema_1.ProductSpecificationSchema], default: [] }),
    __metadata("design:type", Array)
], Product.prototype, "specifications", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [product_variant_schema_1.ProductVariantSchema], default: [] }),
    __metadata("design:type", Array)
], Product.prototype, "variants", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ProductStatus,
        default: ProductStatus.ACTIVE,
        index: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "status", void 0);
exports.Product = Product = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Product);
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);
exports.ProductSchema.methods.getPrimaryImage = function () {
    return this.media.find((m) => m.mediaType === 'IMAGE' && m.isPrimary) || null;
};
exports.ProductSchema.methods.getSecondaryImages = function () {
    return this.media.filter((m) => m.mediaType === 'IMAGE' && !m.isPrimary);
};
exports.ProductSchema.methods.getAllImages = function () {
    return this.media.filter((m) => m.mediaType === 'IMAGE');
};
exports.ProductSchema.methods.getVideos = function () {
    return this.media.filter((m) => m.mediaType === 'VIDEO');
};
exports.ProductSchema.index({ category: 1, price: 1 });
exports.ProductSchema.index({ name: 'text' });
exports.ProductSchema.index({ status: 1, category: 1 });
//# sourceMappingURL=product.schema.js.map