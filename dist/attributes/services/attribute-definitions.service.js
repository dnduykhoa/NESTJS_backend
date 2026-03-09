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
let AttributeDefinitionsService = class AttributeDefinitionsService {
    attributeDefinitionModel;
    categoryAttributeModel;
    constructor(attributeDefinitionModel, categoryAttributeModel) {
        this.attributeDefinitionModel = attributeDefinitionModel;
        this.categoryAttributeModel = categoryAttributeModel;
    }
    async create(dto) {
        const def = new this.attributeDefinitionModel(dto);
        return def.save();
    }
    async findAll() {
        return this.attributeDefinitionModel.find().populate('attributeGroup').exec();
    }
    async findActive() {
        return this.attributeDefinitionModel.find({ isActive: true }).populate('attributeGroup').exec();
    }
    async findFilterable() {
        return this.attributeDefinitionModel.find({ isFilterable: true }).populate('attributeGroup').exec();
    }
    async findByGroup(groupId) {
        return this.attributeDefinitionModel.find({ attributeGroup: groupId }).exec();
    }
    async findOne(id) {
        const def = await this.attributeDefinitionModel.findById(id).populate('attributeGroup').exec();
        if (!def) {
            throw new common_1.NotFoundException(`Attribute definition with ID ${id} not found`);
        }
        return def;
    }
    async findByKey(attrKey) {
        const def = await this.attributeDefinitionModel.findOne({ attrKey }).populate('attributeGroup').exec();
        if (!def) {
            throw new common_1.NotFoundException(`Attribute definition with key ${attrKey} not found`);
        }
        return def;
    }
    async update(id, dto) {
        const def = await this.attributeDefinitionModel
            .findByIdAndUpdate(id, dto, { new: true })
            .populate('attributeGroup')
            .exec();
        if (!def) {
            throw new common_1.NotFoundException(`Attribute definition with ID ${id} not found`);
        }
        return def;
    }
    async remove(id) {
        const caCount = await this.categoryAttributeModel.countDocuments({ attributeDefinition: id }).exec();
        if (caCount > 0) {
            throw new common_1.BadRequestException(`Cannot delete this attribute definition because it is used in ${caCount} category attributes. Please remove them first.`);
        }
        const def = await this.attributeDefinitionModel.findByIdAndDelete(id).exec();
        if (!def) {
            throw new common_1.NotFoundException(`Attribute definition with ID ${id} not found`);
        }
        return { message: 'Attribute definition deleted successfully', definition: def };
    }
};
exports.AttributeDefinitionsService = AttributeDefinitionsService;
exports.AttributeDefinitionsService = AttributeDefinitionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attribute_definition_schema_1.AttributeDefinition.name)),
    __param(1, (0, mongoose_1.InjectModel)('CategoryAttribute')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AttributeDefinitionsService);
//# sourceMappingURL=attribute-definitions.service.js.map