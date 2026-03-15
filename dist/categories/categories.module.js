"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const categories_controller_1 = require("./categories.controller");
const category_attributes_controller_1 = require("./controllers/category-attributes.controller");
const categories_service_1 = require("./categories.service");
const category_attributes_service_1 = require("./services/category-attributes.service");
const category_schema_1 = require("./schemas/category.schema");
const category_attribute_schema_1 = require("./schemas/category-attribute.schema");
const attribute_definition_schema_1 = require("../attributes/schemas/attribute-definition.schema");
const product_schema_1 = require("../products/schemas/product.schema");
let CategoriesModule = class CategoriesModule {
};
exports.CategoriesModule = CategoriesModule;
exports.CategoriesModule = CategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: category_schema_1.Category.name, schema: category_schema_1.CategorySchema },
                { name: category_attribute_schema_1.CategoryAttribute.name, schema: category_attribute_schema_1.CategoryAttributeSchema },
                { name: 'AttributeDefinition', schema: attribute_definition_schema_1.AttributeDefinitionSchema },
                { name: 'Product', schema: product_schema_1.ProductSchema },
            ]),
        ],
        controllers: [categories_controller_1.CategoriesController, category_attributes_controller_1.CategoryAttributesController],
        providers: [categories_service_1.CategoriesService, category_attributes_service_1.CategoryAttributesService],
        exports: [categories_service_1.CategoriesService, category_attributes_service_1.CategoryAttributesService],
    })
], CategoriesModule);
//# sourceMappingURL=categories.module.js.map