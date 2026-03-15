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
const attribute_definition_schema_1 = require("../schemas/attribute-definition.schema");
let AttributeGroupsService = class AttributeGroupsService {
    constructor(attributeGroupModel, attributeDefinitionModel) {
        this.attributeGroupModel = attributeGroupModel;
        this.attributeDefinitionModel = attributeDefinitionModel;
    }
    async getAllGroups() {
        return this.attributeGroupModel.find().sort({ displayOrder: 1, name: 1 }).exec();
    }
    async getActiveGroups() {
        return this.attributeGroupModel
            .find({ isActive: true })
            .sort({ displayOrder: 1, name: 1 })
            .exec();
    }
    async getGroupById(id) {
        const group = await this.attributeGroupModel.findById(id).exec();
        if (!group) {
            throw new common_1.NotFoundException(`Không tìm thấy nhóm thuộc tính với ID: ${id}`);
        }
        return group;
    }
    async createGroup(dto) {
        const existing = await this.attributeGroupModel.findOne({ name: dto.name }).exec();
        if (existing) {
            throw new common_1.BadRequestException(`Đã tồn tại nhóm thuộc tính với tên: ${dto.name}`);
        }
        const group = new this.attributeGroupModel({
            ...dto,
            displayOrder: dto.displayOrder ?? 0,
            isActive: dto.isActive ?? true,
        });
        return group.save();
    }
    async updateGroup(id, dto) {
        const group = await this.getGroupById(id);
        if (dto.name && dto.name !== group.name) {
            const existing = await this.attributeGroupModel.findOne({ name: dto.name }).exec();
            if (existing) {
                throw new common_1.BadRequestException(`Đã tồn tại nhóm thuộc tính với tên: ${dto.name}`);
            }
        }
        Object.assign(group, dto);
        return group.save();
    }
    async deleteGroup(id) {
        await this.getGroupById(id);
        const definitionCount = await this.attributeDefinitionModel
            .countDocuments({ attributeGroup: new mongoose_2.Types.ObjectId(id) })
            .exec();
        if (definitionCount > 0) {
            throw new common_1.BadRequestException(`Không thể xóa nhóm thuộc tính này vì còn ${definitionCount} định nghĩa thuộc tính. Hãy xóa hoặc chuyển các thuộc tính trước`);
        }
        await this.attributeGroupModel.findByIdAndDelete(id).exec();
    }
};
exports.AttributeGroupsService = AttributeGroupsService;
exports.AttributeGroupsService = AttributeGroupsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attribute_group_schema_1.AttributeGroup.name)),
    __param(1, (0, mongoose_1.InjectModel)(attribute_definition_schema_1.AttributeDefinition.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AttributeGroupsService);
//# sourceMappingURL=attribute-groups.service.js.map