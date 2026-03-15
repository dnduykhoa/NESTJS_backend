"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PasswordValidator_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordValidator = void 0;
const common_1 = require("@nestjs/common");
let PasswordValidator = PasswordValidator_1 = class PasswordValidator {
    validate(password) {
        if (!password || password.length < PasswordValidator_1.MIN_LENGTH) {
            throw new Error(`Mật khẩu phải có ít nhất ${PasswordValidator_1.MIN_LENGTH} ký tự`);
        }
        if (!PasswordValidator_1.UPPERCASE_PATTERN.test(password)) {
            throw new Error('Mật khẩu phải chứa ít nhất 1 chữ hoa');
        }
        if (!PasswordValidator_1.LOWERCASE_PATTERN.test(password)) {
            throw new Error('Mật khẩu phải chứa ít nhất 1 chữ thường');
        }
        if (!PasswordValidator_1.DIGIT_PATTERN.test(password)) {
            throw new Error('Mật khẩu phải chứa ít nhất 1 chữ số');
        }
        if (!PasswordValidator_1.SPECIAL_CHAR_PATTERN.test(password)) {
            throw new Error('Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt');
        }
    }
    isValid(password) {
        try {
            this.validate(password);
            return true;
        }
        catch {
            return false;
        }
    }
};
exports.PasswordValidator = PasswordValidator;
PasswordValidator.MIN_LENGTH = 8;
PasswordValidator.UPPERCASE_PATTERN = /.*[A-Z].*/;
PasswordValidator.LOWERCASE_PATTERN = /.*[a-z].*/;
PasswordValidator.DIGIT_PATTERN = /.*[0-9].*/;
PasswordValidator.SPECIAL_CHAR_PATTERN = /.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*/;
exports.PasswordValidator = PasswordValidator = PasswordValidator_1 = __decorate([
    (0, common_1.Injectable)()
], PasswordValidator);
//# sourceMappingURL=password.validator.js.map