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
exports.ProductMediaSchema = exports.ProductMedia = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let ProductMedia = class ProductMedia {
    mediaUrl;
    mediaType;
    isPrimary;
    displayOrder;
    altText;
};
exports.ProductMedia = ProductMedia;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ProductMedia.prototype, "mediaUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['IMAGE', 'VIDEO'], default: 'IMAGE' }),
    __metadata("design:type", String)
], ProductMedia.prototype, "mediaType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ProductMedia.prototype, "isPrimary", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ProductMedia.prototype, "displayOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProductMedia.prototype, "altText", void 0);
exports.ProductMedia = ProductMedia = __decorate([
    (0, mongoose_1.Schema)({ _id: true })
], ProductMedia);
exports.ProductMediaSchema = mongoose_1.SchemaFactory.createForClass(ProductMedia);
//# sourceMappingURL=product-media.schema.js.map