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
exports.CategoryAttributesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_attribute_schema_1 = require("../schemas/category-attribute.schema");
let CategoryAttributesService = class CategoryAttributesService {
    categoryAttributeModel;
    constructor(categoryAttributeModel) {
        this.categoryAttributeModel = categoryAttributeModel;
    }
    async findByCategory(categoryId) {
        return this.categoryAttributeModel
            .find({ category: categoryId })
            .populate('attributeDefinition')
            .exec();
    }
    async assign(dto) {
        const existing = await this.categoryAttributeModel
            .findOne({ category: dto.category, attributeDefinition: dto.attributeDefinition })
            .exec();
        if (existing) {
            throw new common_1.BadRequestException('This attribute is already assigned to this category');
        }
        const ca = new this.categoryAttributeModel(dto);
        return ca.save();
    }
    async update(id, dto) {
        const ca = await this.categoryAttributeModel
            .findByIdAndUpdate(id, dto, { new: true })
            .populate('attributeDefinition')
            .exec();
        if (!ca) {
            throw new common_1.NotFoundException(`Category attribute with ID ${id} not found`);
        }
        return ca;
    }
    async remove(id) {
        const ca = await this.categoryAttributeModel.findByIdAndDelete(id).exec();
        if (!ca) {
            throw new common_1.NotFoundException(`Category attribute with ID ${id} not found`);
        }
        return { message: 'Attribute removed from category successfully' };
    }
    async removeByKeys(categoryId, attrDefId) {
        const ca = await this.categoryAttributeModel
            .findOneAndDelete({ category: categoryId, attributeDefinition: attrDefId })
            .exec();
        if (!ca) {
            throw new common_1.NotFoundException('Category attribute not found');
        }
        return { message: 'Attribute removed from category successfully' };
    }
};
exports.CategoryAttributesService = CategoryAttributesService;
exports.CategoryAttributesService = CategoryAttributesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_attribute_schema_1.CategoryAttribute.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoryAttributesService);
//# sourceMappingURL=category-attributes.service.js.map