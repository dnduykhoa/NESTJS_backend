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
exports.ProductVariantSchema = exports.ProductVariant = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const product_variant_value_schema_1 = require("./product-variant-value.schema");
const product_media_schema_1 = require("./product-media.schema");
let ProductVariant = class ProductVariant {
};
exports.ProductVariant = ProductVariant;
__decorate([
    (0, mongoose_1.Prop)({ required: true, maxlength: 100 }),
    __metadata("design:type", String)
], ProductVariant.prototype, "sku", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 0 }),
    __metadata("design:type", Number)
], ProductVariant.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 0, default: 0 }),
    __metadata("design:type", Number)
], ProductVariant.prototype, "stockQuantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], ProductVariant.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ProductVariant.prototype, "displayOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [product_variant_value_schema_1.ProductVariantValueSchema], default: [] }),
    __metadata("design:type", Array)
], ProductVariant.prototype, "values", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [product_media_schema_1.ProductMediaSchema], default: [] }),
    __metadata("design:type", Array)
], ProductVariant.prototype, "media", void 0);
exports.ProductVariant = ProductVariant = __decorate([
    (0, mongoose_1.Schema)({ _id: true, timestamps: true })
], ProductVariant);
exports.ProductVariantSchema = mongoose_1.SchemaFactory.createForClass(ProductVariant);
//# sourceMappingURL=product-variant.schema.js.map