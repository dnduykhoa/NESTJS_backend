"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const schedule_1 = require("@nestjs/schedule");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./database/database.module");
const roles_module_1 = require("./roles/roles.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const products_module_1 = require("./products/products.module");
const categories_module_1 = require("./categories/categories.module");
const brands_module_1 = require("./brands/brands.module");
const orders_module_1 = require("./orders/orders.module");
const carts_module_1 = require("./carts/carts.module");
const attributes_module_1 = require("./attributes/attributes.module");
const carousel_module_1 = require("./carousel/carousel.module");
const payments_module_1 = require("./payments/payments.module");
const sse_module_1 = require("./sse/sse.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/techstore'),
            schedule_1.ScheduleModule.forRoot(),
            database_module_1.DatabaseModule,
            roles_module_1.RolesModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            products_module_1.ProductsModule,
            categories_module_1.CategoriesModule,
            brands_module_1.BrandsModule,
            orders_module_1.OrdersModule,
            carts_module_1.CartsModule,
            attributes_module_1.AttributesModule,
            carousel_module_1.CarouselModule,
            payments_module_1.PaymentsModule,
            sse_module_1.SseModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map