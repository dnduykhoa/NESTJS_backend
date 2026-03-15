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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const role_schema_1 = require("./schemas/role.schema");
let RolesService = class RolesService {
    constructor(roleModel) {
        this.roleModel = roleModel;
    }
    async create(createRoleDto) {
        const existing = await this.roleModel.findOne({ name: createRoleDto.name });
        if (existing) {
            throw new Error(`Đã tồn tại vai trò với tên: ${createRoleDto.name}`);
        }
        return new this.roleModel(createRoleDto).save();
    }
    async findAll() {
        return this.roleModel.find({ isDeleted: false }).exec();
    }
    async findById(id) {
        const role = await this.roleModel.findById(id).exec();
        if (!role || role.isDeleted) {
            throw new common_1.NotFoundException(`Không tìm thấy vai trò với ID: ${id}`);
        }
        return role;
    }
    async findByName(name) {
        return this.roleModel.findOne({ name, isDeleted: false }).exec();
    }
    async update(id, updateRoleDto) {
        const role = await this.findById(id);
        if (updateRoleDto.name && updateRoleDto.name !== role.name) {
            const existing = await this.roleModel.findOne({ name: updateRoleDto.name });
            if (existing) {
                throw new Error(`Đã tồn tại vai trò với tên: ${updateRoleDto.name}`);
            }
        }
        Object.assign(role, updateRoleDto);
        return role.save();
    }
    async remove(id) {
        const role = await this.findById(id);
        role.isDeleted = true;
        await role.save();
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(role_schema_1.Role.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RolesService);
//# sourceMappingURL=roles.service.js.map