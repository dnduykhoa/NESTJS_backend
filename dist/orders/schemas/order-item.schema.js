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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemSchema = exports.OrderItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let OrderItem = class OrderItem {
};
exports.OrderItem = OrderItem;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Product', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], OrderItem.prototype, "product", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], OrderItem.prototype, "productName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], OrderItem.prototype, "productImageUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", String)
], OrderItem.prototype, "variantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], OrderItem.prototype, "variantSku", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], OrderItem.prototype, "variantOptions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 1 }),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 0 }),
    __metadata("design:type", Number)
], OrderItem.prototype, "unitPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 0 }),
    __metadata("design:type", Number)
], OrderItem.prototype, "subtotal", void 0);
exports.OrderItem = OrderItem = __decorate([
    (0, mongoose_1.Schema)({ _id: true })
], OrderItem);
exports.OrderItemSchema = mongoose_1.SchemaFactory.createForClass(OrderItem);
//# sourceMappingURL=order-item.schema.js.map