"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PhoneValidator_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneValidator = void 0;
const common_1 = require("@nestjs/common");
let PhoneValidator = PhoneValidator_1 = class PhoneValidator {
    static normalize(phone) {
        if (!phone)
            return phone;
        const cleaned = phone.replace(/[\s\-]/g, '');
        if (cleaned.startsWith('+84'))
            return '0' + cleaned.slice(3);
        if (cleaned.startsWith('84') && cleaned.length === 11)
            return '0' + cleaned.slice(2);
        return cleaned;
    }
    static isValid(phone) {
        if (!phone)
            return false;
        return PhoneValidator_1.PHONE_REGEX.test(phone);
    }
    validate(phone) {
        if (!PhoneValidator_1.isValid(phone)) {
            throw new Error('Số điện thoại Việt Nam không hợp lệ (VD: 0912345678 hoặc +84912345678)');
        }
    }
};
exports.PhoneValidator = PhoneValidator;
PhoneValidator.PHONE_REGEX = /^(\+84|84|0)(3[2-9]|5[25689]|7[06-9]|8[1-9]|9[0-9])\d{7}$/;
exports.PhoneValidator = PhoneValidator = PhoneValidator_1 = __decorate([
    (0, common_1.Injectable)()
], PhoneValidator);
//# sourceMappingURL=phone.validator.js.map