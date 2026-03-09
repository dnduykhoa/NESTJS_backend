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
exports.AttributeGroupsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const attribute_group_schema_1 = require("../schemas/attribute-group.schema");
let AttributeGroupsService = class AttributeGroupsService {
    attributeGroupModel;
    attributeDefinitionModel;
    constructor(attributeGroupModel, attributeDefinitionModel) {
        this.attributeGroupModel = attributeGroupModel;
        this.attributeDefinitionModel = attributeDefinitionModel;
    }
    async create(dto) {
        const group = new this.attributeGroupModel(dto);
        return group.save();
    }
    async findAll() {
        return this.attributeGroupModel.find().exec();
    }
    async findActive() {
        return this.attributeGroupModel.find({ isActive: true }).exec();
    }
    async findOne(id) {
        const group = await this.attributeGroupModel.findById(id).exec();
        if (!group) {
            throw new common_1.NotFoundException(`Attribute group with ID ${id} not found`);
        }
        return group;
    }
    async update(id, dto) {
        const group = await this.attributeGroupModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        if (!group) {
            throw new common_1.NotFoundException(`Attribute group with ID ${id} not found`);
        }
        return group;
    }
    async remove(id) {
        const defCount = await this.attributeDefinitionModel.countDocuments({ attributeGroup: id }).exec();
        if (defCount > 0) {
            throw new common_1.BadRequestException(`Cannot delete this group because it has ${defCount} attribute definitions. Please delete or reassign them first.`);
        }
        const group = await this.attributeGroupModel.findByIdAndDelete(id).exec();
        if (!group) {
            throw new common_1.NotFoundException(`Attribute group with ID ${id} not found`);
        }
        return { message: 'Attribute group deleted successfully', group };
    }
};
exports.AttributeGroupsService = AttributeGroupsService;
exports.AttributeGroupsService = AttributeGroupsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attribute_group_schema_1.AttributeGroup.name)),
    __param(1, (0, mongoose_1.InjectModel)('AttributeDefinition')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AttributeGroupsService);
//# sourceMappingURL=attribute-groups.service.js.map