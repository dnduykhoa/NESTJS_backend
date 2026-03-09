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
exports.CategoryAttributesController = void 0;
const common_1 = require("@nestjs/common");
const category_attributes_service_1 = require("../services/category-attributes.service");
const create_category_attribute_dto_1 = require("../dto/category-attributes/create-category-attribute.dto");
const update_category_attribute_dto_1 = require("../dto/category-attributes/update-category-attribute.dto");
let CategoryAttributesController = class CategoryAttributesController {
    categoryAttributesService;
    constructor(categoryAttributesService) {
        this.categoryAttributesService = categoryAttributesService;
    }
    assign(dto) {
        return this.categoryAttributesService.assign(dto);
    }
    findByCategory(categoryId) {
        return this.categoryAttributesService.findByCategory(categoryId);
    }
    update(id, dto) {
        return this.categoryAttributesService.update(id, dto);
    }
    remove(id) {
        return this.categoryAttributesService.remove(id);
    }
    removeByKeys(categoryId, attrDefId) {
        return this.categoryAttributesService.removeByKeys(categoryId, attrDefId);
    }
};
exports.CategoryAttributesController = CategoryAttributesController;
__decorate([
    (0, common_1.Post)('assign'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_attribute_dto_1.CreateCategoryAttributeDto]),
    __metadata("design:returntype", void 0)
], CategoryAttributesController.prototype, "assign", null);
__decorate([
    (0, common_1.Get)('by-category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryAttributesController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_attribute_dto_1.UpdateCategoryAttributeDto]),
    __metadata("design:returntype", void 0)
], CategoryAttributesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryAttributesController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)('categoryId')),
    __param(1, (0, common_1.Query)('attrDefId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CategoryAttributesController.prototype, "removeByKeys", null);
exports.CategoryAttributesController = CategoryAttributesController = __decorate([
    (0, common_1.Controller)('category-attributes'),
    __metadata("design:paramtypes", [category_attributes_service_1.CategoryAttributesService])
], CategoryAttributesController);
//# sourceMappingURL=category-attributes.controller.js.map