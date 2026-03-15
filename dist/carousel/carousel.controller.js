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
exports.CarouselController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const carousel_service_1 = require("./carousel.service");
const carousel_slide_dto_1 = require("./dto/carousel-slide.dto");
const api_response_dto_1 = require("../common/dto/api-response.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const file_storage_service_1 = require("../utils/file-storage.service");
let CarouselController = class CarouselController {
    constructor(carouselService, fileStorage) {
        this.carouselService = carouselService;
        this.fileStorage = fileStorage;
    }
    async uploadFile(file, res) {
        try {
            if (!file)
                throw new Error('Không có file được upload');
            if (!this.fileStorage.isImageOrVideoFile(file)) {
                throw new Error('File phải là ảnh hoặc video');
            }
            const url = this.fileStorage.storeFile(file, 'carousel');
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Upload file thành công', { url }));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async getActiveSlides(res) {
        try {
            const slides = await this.carouselService.getActiveSlides();
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Lấy danh sách slide đang hoạt động thành công', slides));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async getAllSlides(res) {
        try {
            const slides = await this.carouselService.getAllSlides();
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Lấy tất cả slide thành công', slides));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async create(dto, media, res) {
        try {
            const slide = await this.carouselService.create(dto, media);
            return res.status(common_1.HttpStatus.CREATED).json(new api_response_dto_1.ApiResponse('Tạo slide thành công', slide));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async update(id, dto, media, res) {
        try {
            const slide = await this.carouselService.update(id, dto, media);
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Cập nhật slide thành công', slide));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async remove(id, res) {
        try {
            await this.carouselService.remove(id);
            return res.status(common_1.HttpStatus.OK).json(new api_response_dto_1.ApiResponse('Xóa slide thành công', null));
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
};
exports.CarouselController = CarouselController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CarouselController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CarouselController.prototype, "getActiveSlides", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CarouselController.prototype, "getAllSlides", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('media', { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [carousel_slide_dto_1.CreateCarouselSlideDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CarouselController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('media', { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, carousel_slide_dto_1.UpdateCarouselSlideDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CarouselController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CarouselController.prototype, "remove", null);
exports.CarouselController = CarouselController = __decorate([
    (0, common_1.Controller)('carousel'),
    __metadata("design:paramtypes", [carousel_service_1.CarouselService,
        file_storage_service_1.FileStorageService])
], CarouselController);
//# sourceMappingURL=carousel.controller.js.map