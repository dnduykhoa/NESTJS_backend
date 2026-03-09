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
const create_attribute_definition_dto_1 = require("../dto/definition/create-attribute-definition.dto");
const update_attribute_definition_dto_1 = require("../dto/definition/update-attribute-definition.dto");
let AttributeDefinitionsController = class AttributeDefinitionsController {
    attributeDefinitionsService;
    constructor(attributeDefinitionsService) {
        this.attributeDefinitionsService = attributeDefinitionsService;
    }
    create(dto) {
        return this.attributeDefinitionsService.create(dto);
    }
    findAll() {
        return this.attributeDefinitionsService.findAll();
    }
    findActive() {
        return this.attributeDefinitionsService.findActive();
    }
    findFilterable() {
        return this.attributeDefinitionsService.findFilterable();
    }
    findByGroup(groupId) {
        return this.attributeDefinitionsService.findByGroup(groupId);
    }
    findByKey(attrKey) {
        return this.attributeDefinitionsService.findByKey(attrKey);
    }
    findOne(id) {
        return this.attributeDefinitionsService.findOne(id);
    }
    update(id, dto) {
        return this.attributeDefinitionsService.update(id, dto);
    }
    remove(id) {
        return this.attributeDefinitionsService.remove(id);
    }
};
exports.AttributeDefinitionsController = AttributeDefinitionsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attribute_definition_dto_1.CreateAttributeDefinitionDto]),
    __metadata("design:returntype", void 0)
], AttributeDefinitionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AttributeDefinitionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AttributeDefinitionsController.prototype, "findActive", null);
__decorate([
    (0, common_1.Get)('filterable'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AttributeDefinitionsController.prototype, "findFilterable", null);
__decorate([
    (0, common_1.Get)('by-group/:groupId'),
    __param(0, (0, common_1.Param)('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttributeDefinitionsController.prototype, "findByGroup", null);
__decorate([
    (0, common_1.Get)('key/:attrKey'),
    __param(0, (0, common_1.Param)('attrKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttributeDefinitionsController.prototype, "findByKey", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttributeDefinitionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_attribute_definition_dto_1.UpdateAttributeDefinitionDto]),
    __metadata("design:returntype", void 0)
], AttributeDefinitionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttributeDefinitionsController.prototype, "remove", null);
exports.AttributeDefinitionsController = AttributeDefinitionsController = __decorate([
    (0, common_1.Controller)('attribute-definitions'),
    __metadata("design:paramtypes", [attribute_definitions_service_1.AttributeDefinitionsService])
], AttributeDefinitionsController);
//# sourceMappingURL=attribute-definitions.controller.js.map