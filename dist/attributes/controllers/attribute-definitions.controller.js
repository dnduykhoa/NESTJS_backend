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
exports.AttributeDefinitionsController = void 0;
const common_1 = require("@nestjs/common");
const attribute_definitions_service_1 = require("../services/attribute-definitions.service");
const create_attribute_definition_dto_1 = require("../dto/create-attribute-definition.dto");
const update_attribute_definition_dto_1 = require("../dto/update-attribute-definition.dto");
const api_response_dto_1 = require("../../common/dto/api-response.dto");
let AttributeDefinitionsController = class AttributeDefinitionsController {
    constructor(attributeDefinitionsService) {
        this.attributeDefinitionsService = attributeDefinitionsService;
    }
    async getAll(res) {
        try {
            const definitions = await this.attributeDefinitionsService.getAllDefinitions();
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy danh sách định nghĩa thuộc tính thành công', definitions));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async getActive(res) {
        try {
            const definitions = await this.attributeDefinitionsService.getActiveDefinitions();
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy định nghĩa thuộc tính đang hoạt động thành công', definitions));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async getFilterable(res) {
        try {
            const definitions = await this.attributeDefinitionsService.getFilterableDefinitions();
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy thuộc tính có thể lọc thành công', definitions));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async getByGroup(groupId, res) {
        try {
            const definitions = await this.attributeDefinitionsService.getDefinitionsByGroup(groupId);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy thuộc tính theo nhóm thành công', definitions));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async getByKey(attrKey, res) {
        try {
            const definition = await this.attributeDefinitionsService.getDefinitionByKey(attrKey);
            if (!definition) {
                return res
                    .status(common_1.HttpStatus.NOT_FOUND)
                    .json(new api_response_dto_1.ApiResponse(`Không tìm thấy thuộc tính với khóa: ${attrKey}`, null));
            }
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy thông tin định nghĩa thuộc tính thành công', definition));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async getById(id, res) {
        try {
            const definition = await this.attributeDefinitionsService.getDefinitionById(id);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy thông tin định nghĩa thuộc tính thành công', definition));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async create(dto, res) {
        try {
            const definition = await this.attributeDefinitionsService.createDefinition(dto);
            return res
                .status(common_1.HttpStatus.CREATED)
                .json(new api_response_dto_1.ApiResponse('Tạo định nghĩa thuộc tính thành công', definition));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async update(id, dto, res) {
        try {
            const definition = await this.attributeDefinitionsService.updateDefinition(id, dto);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Cập nhật định nghĩa thuộc tính thành công', definition));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async delete(id, res) {
        try {
            await this.attributeDefinitionsService.deleteDefinition(id);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Xóa định nghĩa thuộc tính thành công', null));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
};
exports.AttributeDefinitionsController = AttributeDefinitionsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttributeDefinitionsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('active'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttributeDefinitionsController.prototype, "getActive", null);
__decorate([
    (0, common_1.Get)('filterable'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttributeDefinitionsController.prototype, "getFilterable", null);
__decorate([
    (0, common_1.Get)('by-group/:groupId'),
    __param(0, (0, common_1.Param)('groupId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AttributeDefinitionsController.prototype, "getByGroup", null);
__decorate([
    (0, common_1.Get)('key/:attrKey'),
    __param(0, (0, common_1.Param)('attrKey')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AttributeDefinitionsController.prototype, "getByKey", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AttributeDefinitionsController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attribute_definition_dto_1.CreateAttributeDefinitionDto, Object]),
    __metadata("design:returntype", Promise)
], AttributeDefinitionsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_attribute_definition_dto_1.UpdateAttributeDefinitionDto, Object]),
    __metadata("design:returntype", Promise)
], AttributeDefinitionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AttributeDefinitionsController.prototype, "delete", null);
exports.AttributeDefinitionsController = AttributeDefinitionsController = __decorate([
    (0, common_1.Controller)('attribute-definitions'),
    __metadata("design:paramtypes", [attribute_definitions_service_1.AttributeDefinitionsService])
], AttributeDefinitionsController);
//# sourceMappingURL=attribute-definitions.controller.js.map