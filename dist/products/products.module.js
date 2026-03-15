"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const products_controller_1 = require("./products.controller");
const products_service_1 = require("./products.service");
const product_schema_1 = require("./schemas/product.schema");
const brand_schema_1 = require("../brands/schemas/brand.schema");
const category_schema_1 = require("../categories/schemas/category.schema");
const file_storage_service_1 = require("../utils/file-storage.service");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
                { name: brand_schema_1.Brand.name, schema: brand_schema_1.BrandSchema },
                { name: category_schema_1.Category.name, schema: category_schema_1.CategorySchema },
            ]),
        ],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService, file_storage_service_1.FileStorageService],
        exports: [products_service_1.ProductsService],
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map