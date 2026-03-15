"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const carts_controller_1 = require("./carts.controller");
const carts_service_1 = require("./carts.service");
const cart_schema_1 = require("./schemas/cart.schema");
const product_schema_1 = require("../products/schemas/product.schema");
let CartsModule = class CartsModule {
};
exports.CartsModule = CartsModule;
exports.CartsModule = CartsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: cart_schema_1.Cart.name, schema: cart_schema_1.CartSchema },
                { name: 'Product', schema: product_schema_1.ProductSchema },
            ]),
        ],
        controllers: [carts_controller_1.CartsController],
        providers: [carts_service_1.CartsService],
        exports: [carts_service_1.CartsService],
    })
], CartsModule);
//# sourceMappingURL=carts.module.js.map