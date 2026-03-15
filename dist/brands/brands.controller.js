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
exports.BrandsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const brands_service_1 = require("./brands.service");
const create_brand_dto_1 = require("./dto/create-brand.dto");
const update_brand_dto_1 = require("./dto/update-brand.dto");
const api_response_dto_1 = require("../common/dto/api-response.dto");
let BrandsController = class BrandsController {
    constructor(brandsService) {
        this.brandsService = brandsService;
    }
    async findAll(res) {
        try {
            const brands = await this.brandsService.findAll();
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Lấy danh sách thương hiệu thành công', brands));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async findActive(res) {
        try {
            const brands = await this.brandsService.findActive();
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Lấy thương hiệu đang hoạt động thành công', brands));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async search(name, res) {
        try {
            const brands = await this.brandsService.search(name || '');
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Tìm kiếm thương hiệu thành công', brands));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async findOne(id, res) {
        try {
            const brand = await this.brandsService.findById(id);
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Lấy thông tin thương hiệu thành công', brand));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async create(dto, logo, res) {
        try {
            const brand = await this.brandsService.create(dto, logo);
            return res.status(common_1.HttpStatus.CREATED).json(new api_response_dto_1.ApiResponse('Tạo thương hiệu thành công', brand));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async update(id, dto, logo, res) {
        try {
            const brand = await this.brandsService.update(id, dto, logo);
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Cập nhật thương hiệu thành công', brand));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async remove(id, res) {
        try {
            await this.brandsService.remove(id);
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Xóa thương hiệu thành công', null));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
};
exports.BrandsController = BrandsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "findActive", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('name')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('logo', { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_brand_dto_1.CreateBrandDto, Object, Object]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('logo', { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_brand_dto_1.UpdateBrandDto, Object, Object]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "remove", null);
exports.BrandsController = BrandsController = __decorate([
    (0, common_1.Controller)('brands'),
    __metadata("design:paramtypes", [brands_service_1.BrandsService])
], BrandsController);
//# sourceMappingURL=brands.controller.js.map