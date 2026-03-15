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
exports.ProductVariantValueSchema = exports.ProductVariantValue = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductVariantValue = class ProductVariantValue {
};
exports.ProductVariantValue = ProductVariantValue;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'AttributeDefinition', default: null }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ProductVariantValue.prototype, "attributeDefinition", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, maxlength: 100 }),
    __metadata("design:type", String)
], ProductVariantValue.prototype, "attrKey", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, maxlength: 200 }),
    __metadata("design:type", String)
], ProductVariantValue.prototype, "attrValue", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, type: Number }),
    __metadata("design:type", Number)
], ProductVariantValue.prototype, "valueNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ProductVariantValue.prototype, "displayOrder", void 0);
exports.ProductVariantValue = ProductVariantValue = __decorate([
    (0, mongoose_1.Schema)({ _id: true })
], ProductVariantValue);
exports.ProductVariantValueSchema = mongoose_1.SchemaFactory.createForClass(ProductVariantValue);
//# sourceMappingURL=product-variant-value.schema.js.map