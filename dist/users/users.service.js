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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const role_schema_1 = require("../roles/schemas/role.schema");
const phone_validator_1 = require("../utils/phone.validator");
let UsersService = class UsersService {
    constructor(userModel, roleModel) {
        this.userModel = userModel;
        this.roleModel = roleModel;
    }
    async findById(id) {
        const user = await this.userModel
            .findById(id)
            .select('-password -resetPasswordToken -resetPasswordExpires')
            .populate('role')
            .exec();
        if (!user || user.isDeleted) {
            throw new common_1.NotFoundException(`Không tìm thấy người dùng với ID: ${id}`);
        }
        return user;
    }
    async getAllUsers() {
        return this.userModel
            .find({ isDeleted: false })
            .select('-password -resetPasswordToken -resetPasswordExpires')
            .populate('role')
            .exec();
    }
    async searchUsers(keyword) {
        const regex = new RegExp(keyword, 'i');
        return this.userModel
            .find({
            isDeleted: false,
            $or: [{ username: regex }, { email: regex }, { fullName: regex }],
        })
            .select('-password -resetPasswordToken -resetPasswordExpires')
            .populate('role')
            .exec();
    }
    async updateProfile(userId, dto) {
        const user = await this.userModel.findById(userId);
        if (!user || user.isDeleted) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        if (dto.fullName !== undefined)
            user.fullName = dto.fullName;
        if (dto.email !== undefined) {
            const emailLower = dto.email.toLowerCase();
            const existing = await this.userModel.findOne({ email: emailLower, _id: { $ne: userId } });
            if (existing)
                throw new Error('Email đã được sử dụng');
            user.email = emailLower;
        }
        if (dto.phone !== undefined) {
            const normalized = phone_validator_1.PhoneValidator.normalize(dto.phone);
            const existing = await this.userModel.findOne({ phone: normalized, _id: { $ne: userId } });
            if (existing)
                throw new Error('Số điện thoại đã được sử dụng');
            user.phone = normalized;
        }
        if (dto.birthDate !== undefined) {
            user.birthDate = dto.birthDate ? new Date(dto.birthDate) : null;
        }
        if (dto.avatarUrl !== undefined)
            user.avatarUrl = dto.avatarUrl;
        return user.save();
    }
    async updateUserRoles(userId, roleNames) {
        const user = await this.userModel.findById(userId);
        if (!user || user.isDeleted) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        if (roleNames.length === 0)
            throw new Error('Phải có ít nhất 1 vai trò');
        const roleName = roleNames[0];
        const role = await this.roleModel.findOne({ name: roleName });
        if (!role)
            throw new Error(`Không tìm thấy vai trò: ${roleName}`);
        user.role = role._id;
        return user.save();
    }
    async deleteUser(userId) {
        const user = await this.userModel.findById(userId);
        if (!user || user.isDeleted) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        user.isDeleted = true;
        await user.save();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(role_schema_1.Role.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map