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
exports.AttributeDefinitionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const attribute_definition_schema_1 = require("../schemas/attribute-definition.schema");
const attribute_group_schema_1 = require("../schemas/attribute-group.schema");
let AttributeDefinitionsService = class AttributeDefinitionsService {
    constructor(attributeDefinitionModel, attributeGroupModel) {
        this.attributeDefinitionModel = attributeDefinitionModel;
        this.attributeGroupModel = attributeGroupModel;
    }
    async getAllDefinitions() {
        return this.attributeDefinitionModel
            .find()
            .populate('attributeGroup')
            .sort({ displayOrder: 1, name: 1 })
            .exec();
    }
    async getActiveDefinitions() {
        return this.attributeDefinitionModel
            .find({ isActive: true })
            .populate('attributeGroup')
            .sort({ displayOrder: 1, name: 1 })
            .exec();
    }
    async getFilterableDefinitions() {
        return this.attributeDefinitionModel
            .find({ isFilterable: true })
            .populate('attributeGroup')
            .sort({ displayOrder: 1, name: 1 })
            .exec();
    }
    async getDefinitionsByGroup(groupId) {
        return this.attributeDefinitionModel
            .find({ attributeGroup: new mongoose_2.Types.ObjectId(groupId) })
            .populate('attributeGroup')
            .sort({ displayOrder: 1, name: 1 })
            .exec();
    }
    async getDefinitionById(id) {
        const definition = await this.attributeDefinitionModel
            .findById(id)
            .populate('attributeGroup')
            .exec();
        if (!definition) {
            throw new common_1.NotFoundException(`Không tìm thấy định nghĩa thuộc tính với ID: ${id}`);
        }
        return definition;
    }
    async getDefinitionByKey(attrKey) {
        return this.attributeDefinitionModel
            .findOne({ attrKey })
            .populate('attributeGroup')
            .exec();
    }
    async createDefinition(dto) {
        const existing = await this.attributeDefinitionModel.findOne({ attrKey: dto.attrKey }).exec();
        if (existing) {
            throw new common_1.BadRequestException(`Đã tồn tại định nghĩa thuộc tính với khóa: ${dto.attrKey}`);
        }
        let attributeGroup = null;
        if (dto.groupId) {
            const group = await this.attributeGroupModel.findById(dto.groupId).exec();
            if (!group) {
                throw new common_1.NotFoundException(`Không tìm thấy nhóm thuộc tính với ID: ${dto.groupId}`);
            }
            attributeGroup = new mongoose_2.Types.ObjectId(dto.groupId);
        }
        const { groupId, ...rest } = dto;
        const definition = new this.attributeDefinitionModel({
            ...rest,
            attributeGroup,
            displayOrder: dto.displayOrder ?? 0,
            isActive: dto.isActive ?? true,
            isFilterable: dto.isFilterable ?? false,
            isRequired: dto.isRequired ?? false,
        });
        return definition.save();
    }
    async updateDefinition(id, dto) {
        const definition = await this.getDefinitionById(id);
        if (dto.attrKey && dto.attrKey !== definition.attrKey) {
            const existing = await this.attributeDefinitionModel
                .findOne({ attrKey: dto.attrKey })
                .exec();
            if (existing) {
                throw new common_1.BadRequestException(`Đã tồn tại định nghĩa thuộc tính với khóa: ${dto.attrKey}`);
            }
        }
        const { groupId, ...rest } = dto;
        if (groupId !== undefined) {
            if (groupId === null) {
                definition.attributeGroup = null;
            }
            else {
                const group = await this.attributeGroupModel.findById(groupId).exec();
                if (!group) {
                    throw new common_1.NotFoundException(`Không tìm thấy nhóm thuộc tính với ID: ${groupId}`);
                }
                definition.attributeGroup = new mongoose_2.Types.ObjectId(groupId);
            }
        }
        Object.assign(definition, rest);
        return definition.save();
    }
    async deleteDefinition(id) {
        const definition = await this.getDefinitionById(id);
        await this.attributeDefinitionModel.findByIdAndDelete(definition._id).exec();
    }
};
exports.AttributeDefinitionsService = AttributeDefinitionsService;
exports.AttributeDefinitionsService = AttributeDefinitionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attribute_definition_schema_1.AttributeDefinition.name)),
    __param(1, (0, mongoose_1.InjectModel)(attribute_group_schema_1.AttributeGroup.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AttributeDefinitionsService);
//# sourceMappingURL=attribute-definitions.service.js.map