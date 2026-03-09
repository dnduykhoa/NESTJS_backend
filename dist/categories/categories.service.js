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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_schema_1 = require("./schemas/category.schema");
let CategoriesService = class CategoriesService {
    categoryModel;
    productModel;
    constructor(categoryModel, productModel) {
        this.categoryModel = categoryModel;
        this.productModel = productModel;
    }
    async create(createCategoryDto) {
        const createdCategory = new this.categoryModel(createCategoryDto);
        return createdCategory.save();
    }
    async findAll() {
        return this.categoryModel.find().populate('parent').exec();
    }
    async findRoot() {
        return this.categoryModel.find({ parent: null }).exec();
    }
    async findChildren(id) {
        return this.categoryModel.find({ parent: id }).exec();
    }
    async findActive() {
        return this.categoryModel.find({ isActive: true }).exec();
    }
    async search(name) {
        return this.categoryModel
            .find({ name: { $regex: name, $options: 'i' } })
            .exec();
    }
    async findOne(id) {
        const category = await this.categoryModel.findById(id).populate('parent').exec();
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        const updatedCategory = await this.categoryModel
            .findByIdAndUpdate(id, updateCategoryDto, { new: true })
            .exec();
        if (!updatedCategory) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return updatedCategory;
    }
    async remove(id) {
        const childrenCount = await this.categoryModel.countDocuments({ parent: id }).exec();
        if (childrenCount > 0) {
            throw new common_1.BadRequestException(`Cannot delete this category because it has ${childrenCount} child categories. Please delete or reassign them first.`);
        }
        const productCount = await this.productModel.countDocuments({ category: id }).exec();
        if (productCount > 0) {
            throw new common_1.BadRequestException(`Cannot delete this category because it has ${productCount} products. Please reassign or delete the products first.`);
        }
        const deletedCategory = await this.categoryModel.findByIdAndDelete(id).exec();
        if (!deletedCategory) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return { message: 'Category deleted successfully', category: deletedCategory };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __param(1, (0, mongoose_1.InjectModel)('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map