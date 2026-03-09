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
const create_attribute_group_dto_1 = require("../dto/group/create-attribute-group.dto");
const update_attribute_group_dto_1 = require("../dto/group/update-attribute-group.dto");
let AttributeGroupsController = class AttributeGroupsController {
    attributeGroupsService;
    constructor(attributeGroupsService) {
        this.attributeGroupsService = attributeGroupsService;
    }
    create(dto) {
        return this.attributeGroupsService.create(dto);
    }
    findAll() {
        return this.attributeGroupsService.findAll();
    }
    findActive() {
        return this.attributeGroupsService.findActive();
    }
    findOne(id) {
        return this.attributeGroupsService.findOne(id);
    }
    update(id, dto) {
        return this.attributeGroupsService.update(id, dto);
    }
    remove(id) {
        return this.attributeGroupsService.remove(id);
    }
};
exports.AttributeGroupsController = AttributeGroupsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attribute_group_dto_1.CreateAttributeGroupDto]),
    __metadata("design:returntype", void 0)
], AttributeGroupsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AttributeGroupsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AttributeGroupsController.prototype, "findActive", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttributeGroupsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_attribute_group_dto_1.UpdateAttributeGroupDto]),
    __metadata("design:returntype", void 0)
], AttributeGroupsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttributeGroupsController.prototype, "remove", null);
exports.AttributeGroupsController = AttributeGroupsController = __decorate([
    (0, common_1.Controller)('attribute-groups'),
    __metadata("design:paramtypes", [attribute_groups_service_1.AttributeGroupsService])
], AttributeGroupsController);
//# sourceMappingURL=attribute-groups.controller.js.map