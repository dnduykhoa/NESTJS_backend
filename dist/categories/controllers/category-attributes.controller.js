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
const create_category_attribute_dto_1 = require("../dto/create-category-attribute.dto");
const update_category_attribute_dto_1 = require("../dto/update-category-attribute.dto");
const api_response_dto_1 = require("../../common/dto/api-response.dto");
let CategoryAttributesController = class CategoryAttributesController {
    constructor(categoryAttributesService) {
        this.categoryAttributesService = categoryAttributesService;
    }
    async getByCategory(categoryId, res) {
        try {
            const attributes = await this.categoryAttributesService.getByCategory(categoryId);
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Lấy thuộc tính danh mục thành công', attributes));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async assign(body, qCategoryId, qAttrDefId, qIsRequired, qDisplayOrder, res) {
        try {
            const dto = {
                categoryId: body.categoryId || qCategoryId,
                attrDefId: body.attrDefId || qAttrDefId,
                isRequired: body.isRequired !== undefined
                    ? body.isRequired
                    : qIsRequired !== undefined ? qIsRequired === 'true' : undefined,
                displayOrder: body.displayOrder !== undefined
                    ? body.displayOrder
                    : qDisplayOrder !== undefined ? Number(qDisplayOrder) : undefined,
            };
            const assignment = await this.categoryAttributesService.assign(dto);
            return res.status(common_1.HttpStatus.CREATED).json(new api_response_dto_1.ApiResponse('Gán thuộc tính cho danh mục thành công', assignment));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async updateAssignment(id, body, qIsRequired, qDisplayOrder, res) {
        try {
            const dto = {
                isRequired: body.isRequired !== undefined
                    ? body.isRequired
                    : qIsRequired !== undefined ? qIsRequired === 'true' : undefined,
                displayOrder: body.displayOrder !== undefined
                    ? body.displayOrder
                    : qDisplayOrder !== undefined ? Number(qDisplayOrder) : undefined,
            };
            const assignment = await this.categoryAttributesService.updateAssignment(id, dto);
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Cập nhật liên kết thuộc tính-danh mục thành công', assignment));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async removeByCategoryAndDef(categoryId, attrDefId, res) {
        try {
            await this.categoryAttributesService.removeByCategoryAndDef(categoryId, attrDefId);
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Xóa liên kết thuộc tính-danh mục thành công', null));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async removeById(id, res) {
        try {
            await this.categoryAttributesService.removeById(id);
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Xóa liên kết thuộc tính-danh mục thành công', null));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
};
exports.CategoryAttributesController = CategoryAttributesController;
__decorate([
    (0, common_1.Get)('by-category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoryAttributesController.prototype, "getByCategory", null);
__decorate([
    (0, common_1.Post)('assign'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('categoryId')),
    __param(2, (0, common_1.Query)('attrDefId')),
    __param(3, (0, common_1.Query)('isRequired')),
    __param(4, (0, common_1.Query)('displayOrder')),
    __param(5, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_attribute_dto_1.CreateCategoryAttributeDto, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], CategoryAttributesController.prototype, "assign", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('isRequired')),
    __param(3, (0, common_1.Query)('displayOrder')),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_attribute_dto_1.UpdateCategoryAttributeDto, String, String, Object]),
    __metadata("design:returntype", Promise)
], CategoryAttributesController.prototype, "updateAssignment", null);
__decorate([
    (0, common_1.Delete)('remove'),
    __param(0, (0, common_1.Query)('categoryId')),
    __param(1, (0, common_1.Query)('attrDefId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CategoryAttributesController.prototype, "removeByCategoryAndDef", null);
__decorate([
    (0, common_1.Delete)('remove/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoryAttributesController.prototype, "removeById", null);
exports.CategoryAttributesController = CategoryAttributesController = __decorate([
    (0, common_1.Controller)('category-attributes'),
    __metadata("design:paramtypes", [category_attributes_service_1.CategoryAttributesService])
], CategoryAttributesController);
//# sourceMappingURL=category-attributes.controller.js.map