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
exports.CarouselSlideSchema = exports.CarouselSlide = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let CarouselSlide = class CarouselSlide {
};
exports.CarouselSlide = CarouselSlide;
__decorate([
    (0, mongoose_1.Prop)({ default: null, maxlength: 1000 }),
    __metadata("design:type", String)
], CarouselSlide.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'IMAGE', enum: ['IMAGE', 'VIDEO'] }),
    __metadata("design:type", String)
], CarouselSlide.prototype, "mediaType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, maxlength: 100 }),
    __metadata("design:type", String)
], CarouselSlide.prototype, "badge", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, maxlength: 500 }),
    __metadata("design:type", String)
], CarouselSlide.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, type: String }),
    __metadata("design:type", String)
], CarouselSlide.prototype, "subtitle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, maxlength: 100 }),
    __metadata("design:type", String)
], CarouselSlide.prototype, "buttonText", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, maxlength: 500 }),
    __metadata("design:type", String)
], CarouselSlide.prototype, "buttonLink", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0, type: Number }),
    __metadata("design:type", Number)
], CarouselSlide.prototype, "displayOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 4000, type: Number }),
    __metadata("design:type", Number)
], CarouselSlide.prototype, "intervalMs", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], CarouselSlide.prototype, "isActive", void 0);
exports.CarouselSlide = CarouselSlide = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], CarouselSlide);
exports.CarouselSlideSchema = mongoose_1.SchemaFactory.createForClass(CarouselSlide);
exports.CarouselSlideSchema.index({ isActive: 1, displayOrder: 1 });
//# sourceMappingURL=carousel-slide.schema.js.map