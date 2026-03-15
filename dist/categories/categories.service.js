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
    constructor(categoryModel, productModel) {
        this.categoryModel = categoryModel;
        this.productModel = productModel;
    }
    async findAll() {
        return this.categoryModel
            .find()
            .populate('parent')
            .sort({ displayOrder: 1, name: 1 })
            .exec();
    }
    async findRoot() {
        return this.categoryModel
            .find({ parent: null })
            .sort({ displayOrder: 1, name: 1 })
            .exec();
    }
    async findChildren(id) {
        return this.categoryModel
            .find({ parent: id })
            .sort({ displayOrder: 1, name: 1 })
            .exec();
    }
    async findActive() {
        return this.categoryModel
            .find({ isActive: true })
            .populate('parent')
            .sort({ displayOrder: 1, name: 1 })
            .exec();
    }
    async search(name) {
        return this.categoryModel
            .find({ name: { $regex: name, $options: 'i' } })
            .populate('parent')
            .sort({ displayOrder: 1 })
            .exec();
    }
    async findById(id) {
        const category = await this.categoryModel.findById(id).populate('parent').exec();
        if (!category)
            throw new common_1.NotFoundException(`Không tìm thấy danh mục với ID: ${id}`);
        return category;
    }
    async create(dto) {
        const existing = await this.categoryModel.findOne({ name: dto.name });
        if (existing)
            throw new Error(`Đã tồn tại danh mục với tên: ${dto.name}`);
        let parent = null;
        if (dto.parentId) {
            const parentCategory = await this.categoryModel.findById(dto.parentId);
            if (!parentCategory)
                throw new common_1.NotFoundException(`Không tìm thấy danh mục cha với ID: ${dto.parentId}`);
            parent = dto.parentId;
        }
        return new this.categoryModel({
            name: dto.name,
            description: dto.description,
            displayOrder: dto.displayOrder ?? 0,
            isActive: dto.isActive ?? true,
            parent,
        }).save();
    }
    async update(id, dto) {
        const category = await this.findById(id);
        if (dto.name && dto.name !== category.name) {
            const existing = await this.categoryModel.findOne({ name: dto.name });
            if (existing)
                throw new Error(`Đã tồn tại danh mục với tên: ${dto.name}`);
        }
        if (dto.parentId !== undefined) {
            if (dto.parentId === null || dto.parentId === '') {
                category.parent = null;
            }
            else {
                if (dto.parentId === id) {
                    throw new common_1.BadRequestException('Danh mục không thể là cha của chính nó');
                }
                const parentCategory = await this.categoryModel.findById(dto.parentId);
                if (!parentCategory)
                    throw new common_1.NotFoundException(`Không tìm thấy danh mục cha với ID: ${dto.parentId}`);
                category.parent = dto.parentId;
            }
        }
        if (dto.name !== undefined)
            category.name = dto.name;
        if (dto.description !== undefined)
            category.description = dto.description;
        if (dto.displayOrder !== undefined)
            category.displayOrder = dto.displayOrder;
        if (dto.isActive !== undefined)
            category.isActive = dto.isActive;
        return category.save();
    }
    async remove(id) {
        await this.findById(id);
        const childCount = await this.categoryModel.countDocuments({ parent: id });
        if (childCount > 0) {
            throw new common_1.BadRequestException(`Không thể xóa danh mục này vì còn ${childCount} danh mục con. Hãy xóa hoặc chuyển danh mục con trước`);
        }
        const productCount = await this.productModel.countDocuments({ category: id });
        if (productCount > 0) {
            throw new common_1.BadRequestException(`Không thể xóa danh mục này vì còn ${productCount} sản phẩm. Hãy xóa hoặc chuyển sản phẩm trước`);
        }
        await this.categoryModel.findByIdAndDelete(id);
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