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
exports.BrandsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const brand_schema_1 = require("./schemas/brand.schema");
const file_storage_service_1 = require("../utils/file-storage.service");
let BrandsService = class BrandsService {
    constructor(brandModel, productModel, fileStorage) {
        this.brandModel = brandModel;
        this.productModel = productModel;
        this.fileStorage = fileStorage;
    }
    async findAll() {
        return this.brandModel.find().sort({ displayOrder: 1, name: 1 }).exec();
    }
    async findActive() {
        return this.brandModel.find({ isActive: true }).sort({ displayOrder: 1, name: 1 }).exec();
    }
    async findById(id) {
        const brand = await this.brandModel.findById(id).exec();
        if (!brand)
            throw new common_1.NotFoundException(`Không tìm thấy thương hiệu với ID: ${id}`);
        return brand;
    }
    async search(name) {
        return this.brandModel
            .find({ name: { $regex: name, $options: 'i' } })
            .sort({ displayOrder: 1 })
            .exec();
    }
    async create(dto, logoFile) {
        const existing = await this.brandModel.findOne({ name: dto.name });
        if (existing)
            throw new Error(`Đã tồn tại thương hiệu với tên: ${dto.name}`);
        let logoUrl;
        if (logoFile) {
            if (!this.fileStorage.isImageFile(logoFile)) {
                throw new Error('File logo phải là ảnh (JPG, PNG, WEBP, SVG,...)');
            }
            logoUrl = this.fileStorage.storeFile(logoFile, 'brands');
        }
        return new this.brandModel({
            ...dto,
            logoUrl,
            displayOrder: dto.displayOrder ?? 0,
            isActive: dto.isActive ?? true,
        }).save();
    }
    async update(id, dto, logoFile) {
        const brand = await this.findById(id);
        if (dto.name && dto.name !== brand.name) {
            const existing = await this.brandModel.findOne({ name: dto.name });
            if (existing)
                throw new Error(`Đã tồn tại thương hiệu với tên: ${dto.name}`);
        }
        if (logoFile) {
            if (!this.fileStorage.isImageFile(logoFile)) {
                throw new Error('File logo phải là ảnh');
            }
            if (brand.logoUrl)
                this.fileStorage.deleteFile(brand.logoUrl);
            brand.logoUrl = this.fileStorage.storeFile(logoFile, 'brands');
        }
        Object.assign(brand, dto);
        return brand.save();
    }
    async remove(id) {
        const brand = await this.findById(id);
        const productCount = await this.productModel.countDocuments({ brand: id });
        if (productCount > 0) {
            throw new common_1.BadRequestException(`Không thể xóa thương hiệu này vì còn ${productCount} sản phẩm. Hãy xóa hoặc chuyển sản phẩm trước`);
        }
        if (brand.logoUrl)
            this.fileStorage.deleteFile(brand.logoUrl);
        await this.brandModel.findByIdAndDelete(id);
    }
};
exports.BrandsService = BrandsService;
exports.BrandsService = BrandsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(brand_schema_1.Brand.name)),
    __param(1, (0, mongoose_1.InjectModel)('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        file_storage_service_1.FileStorageService])
], BrandsService);
//# sourceMappingURL=brands.service.js.map