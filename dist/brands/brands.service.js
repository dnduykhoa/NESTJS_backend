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
let BrandsService = class BrandsService {
    brandModel;
    productModel;
    constructor(brandModel, productModel) {
        this.brandModel = brandModel;
        this.productModel = productModel;
    }
    async create(createBrandDto) {
        const createdBrand = new this.brandModel(createBrandDto);
        return createdBrand.save();
    }
    async findAll() {
        return this.brandModel.find().exec();
    }
    async findActive() {
        return this.brandModel.find({ isActive: true }).exec();
    }
    async search(name) {
        return this.brandModel
            .find({ name: { $regex: name, $options: 'i' } })
            .exec();
    }
    async findOne(id) {
        const brand = await this.brandModel.findById(id).exec();
        if (!brand) {
            throw new common_1.NotFoundException(`Brand with ID ${id} not found`);
        }
        return brand;
    }
    async update(id, updateBrandDto) {
        const updatedBrand = await this.brandModel
            .findByIdAndUpdate(id, updateBrandDto, { new: true })
            .exec();
        if (!updatedBrand) {
            throw new common_1.NotFoundException(`Brand with ID ${id} not found`);
        }
        return updatedBrand;
    }
    async remove(id) {
        const productCount = await this.productModel.countDocuments({ brand: id }).exec();
        if (productCount > 0) {
            throw new common_1.BadRequestException(`Cannot delete this brand because it has ${productCount} products. Please reassign or delete the products first.`);
        }
        const deletedBrand = await this.brandModel
            .findByIdAndDelete(id)
            .exec();
        if (!deletedBrand) {
            throw new common_1.NotFoundException(`Brand with ID ${id} not found`);
        }
        return { message: 'Brand deleted successfully', brand: deletedBrand };
    }
};
exports.BrandsService = BrandsService;
exports.BrandsService = BrandsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(brand_schema_1.Brand.name)),
    __param(1, (0, mongoose_1.InjectModel)('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], BrandsService);
//# sourceMappingURL=brands.service.js.map