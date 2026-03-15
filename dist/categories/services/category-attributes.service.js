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
    constructor(categoryAttributeModel) {
        this.categoryAttributeModel = categoryAttributeModel;
    }
    async getByCategory(categoryId) {
        return this.categoryAttributeModel
            .find({ category: categoryId })
            .populate('attributeDefinition')
            .sort({ displayOrder: 1 })
            .exec();
    }
    async assign(dto) {
        const existing = await this.categoryAttributeModel.findOne({
            category: dto.categoryId,
            attributeDefinition: dto.attrDefId,
        });
        if (existing) {
            throw new common_1.BadRequestException(`Thuộc tính này đã được gán cho danh mục. Không thể gán trùng lặp`);
        }
        return new this.categoryAttributeModel({
            category: dto.categoryId,
            attributeDefinition: dto.attrDefId,
            isRequired: dto.isRequired ?? false,
            displayOrder: dto.displayOrder ?? 0,
        }).save();
    }
    async updateAssignment(id, dto) {
        const assignment = await this.categoryAttributeModel.findById(id);
        if (!assignment) {
            throw new common_1.NotFoundException(`Không tìm thấy liên kết thuộc tính-danh mục với ID: ${id}`);
        }
        if (dto.isRequired !== undefined)
            assignment.isRequired = dto.isRequired;
        if (dto.displayOrder !== undefined)
            assignment.displayOrder = dto.displayOrder;
        return assignment.save();
    }
    async removeById(id) {
        const assignment = await this.categoryAttributeModel.findById(id);
        if (!assignment) {
            throw new common_1.NotFoundException(`Không tìm thấy liên kết thuộc tính-danh mục với ID: ${id}`);
        }
        await this.categoryAttributeModel.findByIdAndDelete(id);
    }
    async removeByCategoryAndDef(categoryId, attrDefId) {
        const assignment = await this.categoryAttributeModel.findOne({
            category: categoryId,
            attributeDefinition: attrDefId,
        });
        if (!assignment) {
            throw new common_1.NotFoundException(`Không tìm thấy liên kết giữa danh mục ${categoryId} và thuộc tính ${attrDefId}`);
        }
        await this.categoryAttributeModel.findByIdAndDelete(assignment._id);
    }
};
exports.CategoryAttributesService = CategoryAttributesService;
exports.CategoryAttributesService = CategoryAttributesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_attribute_schema_1.CategoryAttribute.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoryAttributesService);
//# sourceMappingURL=category-attributes.service.js.map