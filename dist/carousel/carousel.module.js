"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarouselModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const carousel_controller_1 = require("./carousel.controller");
const carousel_service_1 = require("./carousel.service");
const carousel_slide_schema_1 = require("./schemas/carousel-slide.schema");
const file_storage_service_1 = require("../utils/file-storage.service");
let CarouselModule = class CarouselModule {
};
exports.CarouselModule = CarouselModule;
exports.CarouselModule = CarouselModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: carousel_slide_schema_1.CarouselSlide.name, schema: carousel_slide_schema_1.CarouselSlideSchema },
            ]),
        ],
        controllers: [carousel_controller_1.CarouselController],
        providers: [carousel_service_1.CarouselService, file_storage_service_1.FileStorageService],
        exports: [carousel_service_1.CarouselService],
    })
], CarouselModule);
//# sourceMappingURL=carousel.module.js.map