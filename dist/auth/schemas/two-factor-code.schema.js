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
exports.TwoFactorCodeSchema = exports.TwoFactorCode = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let TwoFactorCode = class TwoFactorCode {
};
exports.TwoFactorCode = TwoFactorCode;
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", String)
], TwoFactorCode.prototype, "emailOrPhone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TwoFactorCode.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], TwoFactorCode.prototype, "expiryDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], TwoFactorCode.prototype, "used", void 0);
exports.TwoFactorCode = TwoFactorCode = __decorate([
    (0, mongoose_1.Schema)()
], TwoFactorCode);
exports.TwoFactorCodeSchema = mongoose_1.SchemaFactory.createForClass(TwoFactorCode);
exports.TwoFactorCodeSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });
//# sourceMappingURL=two-factor-code.schema.js.map