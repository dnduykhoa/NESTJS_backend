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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const update_user_roles_dto_1 = require("./dto/update-user-roles.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const api_response_dto_1 = require("../common/dto/api-response.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getProfile(id, res) {
        try {
            const user = await this.usersService.findById(id);
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Lấy thông tin người dùng thành công', user));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async updateProfile(id, dto, res) {
        try {
            const user = await this.usersService.updateProfile(id, dto);
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Cập nhật thông tin thành công', user));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async getAllUsers(res) {
        try {
            const users = await this.usersService.getAllUsers();
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Lấy danh sách người dùng thành công', users));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async searchUsers(keyword, res) {
        try {
            const users = await this.usersService.searchUsers(keyword || '');
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Tìm kiếm người dùng thành công', users));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async deleteUser(id, res) {
        try {
            await this.usersService.deleteUser(id);
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Xóa người dùng thành công', null));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async updateRoles(id, dto, res) {
        try {
            const user = await this.usersService.updateUserRoles(id, dto.roles);
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Cập nhật vai trò thành công', user));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('profile/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('profile/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_profile_dto_1.UpdateProfileDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('keyword')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "searchUsers", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Put)(':id/roles'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_roles_dto_1.UpdateUserRolesDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateRoles", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map