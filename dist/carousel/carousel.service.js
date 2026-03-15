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
exports.CarouselService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const carousel_slide_schema_1 = require("./schemas/carousel-slide.schema");
const file_storage_service_1 = require("../utils/file-storage.service");
let CarouselService = class CarouselService {
    constructor(slideModel, fileStorage) {
        this.slideModel = slideModel;
        this.fileStorage = fileStorage;
    }
    async getActiveSlides() {
        return this.slideModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec();
    }
    async getAllSlides() {
        return this.slideModel.find().sort({ displayOrder: 1 }).exec();
    }
    async getById(id) {
        const slide = await this.slideModel.findById(id).exec();
        if (!slide)
            throw new common_1.NotFoundException(`Không tìm thấy slide với ID: ${id}`);
        return slide;
    }
    async create(dto, mediaFile) {
        let imageUrl = dto.image;
        let mediaType = dto.mediaType || 'IMAGE';
        if (mediaFile) {
            imageUrl = this.fileStorage.storeFile(mediaFile, 'carousel');
            mediaType = this.fileStorage.isVideoFile(mediaFile) ? 'VIDEO' : 'IMAGE';
        }
        const slide = new this.slideModel({
            ...dto,
            image: imageUrl,
            mediaType,
        });
        return slide.save();
    }
    async update(id, dto, mediaFile) {
        const slide = await this.getById(id);
        if (mediaFile) {
            if (slide.image)
                this.fileStorage.deleteFile(slide.image);
            const newImageUrl = this.fileStorage.storeFile(mediaFile, 'carousel');
            const newMediaType = this.fileStorage.isVideoFile(mediaFile) ? 'VIDEO' : 'IMAGE';
            Object.assign(slide, dto);
            slide.image = newImageUrl;
            slide.mediaType = newMediaType;
        }
        else {
            Object.assign(slide, dto);
        }
        return slide.save();
    }
    async remove(id) {
        const slide = await this.getById(id);
        if (slide.image)
            this.fileStorage.deleteFile(slide.image);
        await this.slideModel.findByIdAndDelete(id);
    }
};
exports.CarouselService = CarouselService;
exports.CarouselService = CarouselService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(carousel_slide_schema_1.CarouselSlide.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        file_storage_service_1.FileStorageService])
], CarouselService);
//# sourceMappingURL=carousel.service.js.map