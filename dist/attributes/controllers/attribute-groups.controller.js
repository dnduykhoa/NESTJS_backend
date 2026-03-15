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
exports.AttributeGroupsController = void 0;
const common_1 = require("@nestjs/common");
const attribute_groups_service_1 = require("../services/attribute-groups.service");
const create_attribute_group_dto_1 = require("../dto/create-attribute-group.dto");
const update_attribute_group_dto_1 = require("../dto/update-attribute-group.dto");
const api_response_dto_1 = require("../../common/dto/api-response.dto");
let AttributeGroupsController = class AttributeGroupsController {
    constructor(attributeGroupsService) {
        this.attributeGroupsService = attributeGroupsService;
    }
    async getAll(res) {
        try {
            const groups = await this.attributeGroupsService.getAllGroups();
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy danh sách nhóm thuộc tính thành công', groups));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async getActive(res) {
        try {
            const groups = await this.attributeGroupsService.getActiveGroups();
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy nhóm thuộc tính đang hoạt động thành công', groups));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async getById(id, res) {
        try {
            const group = await this.attributeGroupsService.getGroupById(id);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy thông tin nhóm thuộc tính thành công', group));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async create(dto, res) {
        try {
            const group = await this.attributeGroupsService.createGroup(dto);
            return res
                .status(common_1.HttpStatus.CREATED)
                .json(new api_response_dto_1.ApiResponse('Tạo nhóm thuộc tính thành công', group));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async update(id, dto, res) {
        try {
            const group = await this.attributeGroupsService.updateGroup(id, dto);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Cập nhật nhóm thuộc tính thành công', group));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async delete(id, res) {
        try {
            await this.attributeGroupsService.deleteGroup(id);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Xóa nhóm thuộc tính thành công', null));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
};
exports.AttributeGroupsController = AttributeGroupsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttributeGroupsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('active'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttributeGroupsController.prototype, "getActive", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AttributeGroupsController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attribute_group_dto_1.CreateAttributeGroupDto, Object]),
    __metadata("design:returntype", Promise)
], AttributeGroupsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_attribute_group_dto_1.UpdateAttributeGroupDto, Object]),
    __metadata("design:returntype", Promise)
], AttributeGroupsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AttributeGroupsController.prototype, "delete", null);
exports.AttributeGroupsController = AttributeGroupsController = __decorate([
    (0, common_1.Controller)('attribute-groups'),
    __metadata("design:paramtypes", [attribute_groups_service_1.AttributeGroupsService])
], AttributeGroupsController);
//# sourceMappingURL=attribute-groups.controller.js.map