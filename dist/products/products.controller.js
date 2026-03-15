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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const product_variant_dto_1 = require("./dto/product-variant.dto");
const variant_resolve_dto_1 = require("./dto/variant-resolve.dto");
const api_response_dto_1 = require("../common/dto/api-response.dto");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async findActive(res) {
        try {
            const products = await this.productsService.findActive();
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy danh sách sản phẩm đang hoạt động thành công', products));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async findOutOfStock(res) {
        try {
            const products = await this.productsService.findOutOfStock();
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy sản phẩm hết hàng thành công', products));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async findInactive(res) {
        try {
            const products = await this.productsService.findInactive();
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy danh sách sản phẩm không hoạt động thành công', products));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async searchByName(name, res) {
        try {
            const products = await this.productsService.searchByName(name ?? '');
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Tìm kiếm sản phẩm thành công', products));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async findByPriceRange(min, max, res) {
        try {
            const minVal = parseFloat(min) || 0;
            const maxVal = parseFloat(max) || Number.MAX_SAFE_INTEGER;
            const products = await this.productsService.findByPriceRange(minVal, maxVal);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy sản phẩm theo khoảng giá thành công', products));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async findByCategoriesIds(ids, res) {
        try {
            const idList = ids
                ? ids
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
                : [];
            const products = await this.productsService.findByCategoriesIds(idList);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy sản phẩm theo danh sách danh mục thành công', products));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async findByCategory(categoryId, res) {
        try {
            const products = await this.productsService.findByCategory(categoryId);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy sản phẩm theo danh mục thành công', products));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async findByBrand(brandId, res) {
        try {
            const products = await this.productsService.findByBrand(brandId);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy sản phẩm theo thương hiệu thành công', products));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async filterByNumericSpec(attrKey, minValue, maxValue, res) {
        try {
            const products = await this.productsService.filterByNumericSpec(attrKey, parseFloat(minValue) || 0, parseFloat(maxValue) || Number.MAX_SAFE_INTEGER);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lọc sản phẩm theo thông số kỹ thuật thành công', products));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async findAll(res) {
        try {
            const products = await this.productsService.findAll();
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy danh sách sản phẩm thành công', products));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async create(dto, files, res) {
        try {
            const product = await this.productsService.create(dto, files ?? []);
            return res
                .status(common_1.HttpStatus.CREATED)
                .json(new api_response_dto_1.ApiResponse('Tạo sản phẩm thành công', product));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async update(id, dto, files, res) {
        try {
            if (typeof dto.deleteMediaIds === 'string') {
                dto.deleteMediaIds = dto.deleteMediaIds
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean);
            }
            const product = await this.productsService.update(id, dto, files ?? []);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Cập nhật sản phẩm thành công', product));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async toggleActive(id, res) {
        try {
            const product = await this.productsService.toggleActive(id);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Chuyển đổi trạng thái sản phẩm thành công', product));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async markOutOfStock(id, res) {
        try {
            const product = await this.productsService.markOutOfStock(id);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Đánh dấu sản phẩm hết hàng thành công', product));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async restore(id, res) {
        try {
            const product = await this.productsService.restore(id);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Khôi phục sản phẩm thành công', product));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async remove(id, res) {
        try {
            await this.productsService.remove(id);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Ẩn sản phẩm thành công', null));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async findById(id, res) {
        try {
            const product = await this.productsService.findById(id);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy thông tin sản phẩm thành công', product));
        }
        catch (e) {
            const status = e.status && e.status >= 400 && e.status < 600
                ? e.status
                : common_1.HttpStatus.BAD_REQUEST;
            return res.status(status).json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async getProductMedia(productId, res) {
        try {
            const media = await this.productsService.getProductMedia(productId);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy media sản phẩm thành công', media));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async deleteProductMedia(productId, mediaId, res) {
        try {
            const product = await this.productsService.deleteProductMedia(productId, mediaId);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Xóa media sản phẩm thành công', product));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async setPrimaryMedia(productId, mediaId, res) {
        try {
            const product = await this.productsService.setPrimaryMedia(productId, mediaId);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Đặt ảnh chính thành công', product));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async getVariantOptions(productId, res) {
        try {
            const options = await this.productsService.getVariantOptions(productId);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy tùy chọn biến thể thành công', options));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async createVariant(productId, dto, res) {
        try {
            const product = await this.productsService.createVariant(productId, dto);
            return res
                .status(common_1.HttpStatus.CREATED)
                .json(new api_response_dto_1.ApiResponse('Tạo biến thể thành công', product));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async updateVariant(productId, variantId, dto, res) {
        try {
            const product = await this.productsService.updateVariant(productId, variantId, dto);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Cập nhật biến thể thành công', product));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async deleteVariant(productId, variantId, res) {
        try {
            const product = await this.productsService.deleteVariant(productId, variantId);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Xóa biến thể thành công', product));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async resolveVariant(productId, dto, res) {
        try {
            const variant = await this.productsService.resolveVariant(productId, dto.selections);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Tìm biến thể phù hợp thành công', variant));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async getVariants(productId, onlyActive, res) {
        try {
            const activeOnly = onlyActive === 'true';
            const variants = await this.productsService.getVariants(productId, activeOnly);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy danh sách biến thể thành công', variants));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async getVariantMedia(productId, variantId, res) {
        try {
            const media = await this.productsService.getVariantMedia(productId, variantId);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy media biến thể thành công', media));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async uploadVariantMedia(productId, variantId, files, res) {
        try {
            const product = await this.productsService.uploadVariantMedia(productId, variantId, files ?? []);
            return res
                .status(common_1.HttpStatus.CREATED)
                .json(new api_response_dto_1.ApiResponse('Upload media cho biến thể thành công', product));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async deleteVariantMedia(productId, variantId, mediaId, res) {
        try {
            const product = await this.productsService.deleteVariantMedia(productId, variantId, mediaId);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Xóa media biến thể thành công', product));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async setVariantMediaPrimary(productId, variantId, mediaId, res) {
        try {
            const product = await this.productsService.setVariantMediaPrimary(productId, variantId, mediaId);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Đặt ảnh chính cho biến thể thành công', product));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async getVariant(productId, variantId, res) {
        try {
            const variant = await this.productsService.getVariant(productId, variantId);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy thông tin biến thể thành công', variant));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async getSpecs(productId, res) {
        try {
            const specs = await this.productsService.getSpecs(productId);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Lấy thông số kỹ thuật thành công', specs));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async addSpec(productId, body, res) {
        try {
            const product = await this.productsService.addSpec(productId, body);
            return res
                .status(common_1.HttpStatus.CREATED)
                .json(new api_response_dto_1.ApiResponse('Thêm thông số kỹ thuật thành công', product));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async updateSpec(productId, specId, body, res) {
        try {
            const product = await this.productsService.updateSpec(productId, specId, body);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Cập nhật thông số kỹ thuật thành công', product));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async deleteSpec(productId, specId, res) {
        try {
            const product = await this.productsService.deleteSpec(productId, specId);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Xóa thông số kỹ thuật thành công', product));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
    async clearSpecs(productId, res) {
        try {
            const product = await this.productsService.clearSpecs(productId);
            return res
                .status(common_1.HttpStatus.OK)
                .json(new api_response_dto_1.ApiResponse('Xóa toàn bộ thông số kỹ thuật thành công', product));
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new api_response_dto_1.ApiResponse(e.message, null));
        }
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)('active'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findActive", null);
__decorate([
    (0, common_1.Get)('out-of-stock'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOutOfStock", null);
__decorate([
    (0, common_1.Get)('inactive'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findInactive", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('name')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "searchByName", null);
__decorate([
    (0, common_1.Get)('price-range'),
    __param(0, (0, common_1.Query)('min')),
    __param(1, (0, common_1.Query)('max')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findByPriceRange", null);
__decorate([
    (0, common_1.Get)('categories'),
    __param(0, (0, common_1.Query)('ids')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findByCategoriesIds", null);
__decorate([
    (0, common_1.Get)('category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Get)('brand/:brandId'),
    __param(0, (0, common_1.Param)('brandId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findByBrand", null);
__decorate([
    (0, common_1.Get)('filter/by-spec'),
    __param(0, (0, common_1.Query)('attrKey')),
    __param(1, (0, common_1.Query)('minValue')),
    __param(2, (0, common_1.Query)('maxValue')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "filterByNumericSpec", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 20, { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Array, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 20, { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto, Array, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/toggle-active'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "toggleActive", null);
__decorate([
    (0, common_1.Patch)(':id/out-of-stock'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "markOutOfStock", null);
__decorate([
    (0, common_1.Patch)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "restore", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(':productId/media'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductMedia", null);
__decorate([
    (0, common_1.Delete)(':productId/media/:mediaId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('mediaId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProductMedia", null);
__decorate([
    (0, common_1.Put)(':productId/media/:mediaId/set-primary'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('mediaId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "setPrimaryMedia", null);
__decorate([
    (0, common_1.Get)(':productId/variants/options'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getVariantOptions", null);
__decorate([
    (0, common_1.Post)(':productId/variants/add'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_variant_dto_1.CreateProductVariantDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createVariant", null);
__decorate([
    (0, common_1.Put)(':productId/variants/update/:variantId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('variantId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, product_variant_dto_1.UpdateProductVariantDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateVariant", null);
__decorate([
    (0, common_1.Delete)(':productId/variants/delete/:variantId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('variantId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteVariant", null);
__decorate([
    (0, common_1.Post)(':productId/variants/resolve'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, variant_resolve_dto_1.VariantResolveDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "resolveVariant", null);
__decorate([
    (0, common_1.Get)(':productId/variants'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Query)('onlyActive')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getVariants", null);
__decorate([
    (0, common_1.Get)(':productId/variants/:variantId/media'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('variantId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getVariantMedia", null);
__decorate([
    (0, common_1.Post)(':productId/variants/:variantId/media/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 20, { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('variantId')),
    __param(2, (0, common_1.UploadedFiles)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "uploadVariantMedia", null);
__decorate([
    (0, common_1.Delete)(':productId/variants/:variantId/media/:mediaId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('variantId')),
    __param(2, (0, common_1.Param)('mediaId')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteVariantMedia", null);
__decorate([
    (0, common_1.Put)(':productId/variants/:variantId/media/:mediaId/set-primary'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('variantId')),
    __param(2, (0, common_1.Param)('mediaId')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "setVariantMediaPrimary", null);
__decorate([
    (0, common_1.Get)(':productId/variants/:variantId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('variantId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getVariant", null);
__decorate([
    (0, common_1.Get)(':productId/specifications'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getSpecs", null);
__decorate([
    (0, common_1.Post)(':productId/specifications/add'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "addSpec", null);
__decorate([
    (0, common_1.Put)(':productId/specifications/update/:specId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('specId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateSpec", null);
__decorate([
    (0, common_1.Delete)(':productId/specifications/delete/:specId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('specId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteSpec", null);
__decorate([
    (0, common_1.Delete)(':productId/specifications/clear'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "clearSpecs", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map