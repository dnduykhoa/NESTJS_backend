"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const api_response_dto_1 = require("../dto/api-response.dto");
let GlobalExceptionFilter = class GlobalExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (exception instanceof common_1.BadRequestException) {
            const exResponse = exception.getResponse();
            if (exResponse?.message && Array.isArray(exResponse.message)) {
                const errors = {};
                for (const msg of exResponse.message) {
                    const parts = msg.split(' ');
                    errors['validation'] = msg;
                }
                return response.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse('Vui lòng kiểm tra lại thông tin', errors));
            }
            return response.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(exResponse?.message || exception.message, null));
        }
        if (exception instanceof common_1.HttpException) {
            const status = exception.getStatus();
            return response.status(status).json(new api_response_dto_1.ApiResponse(exception.message, null));
        }
        if (exception instanceof Error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json(new api_response_dto_1.ApiResponse(exception.message, null));
        }
        return response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json(new api_response_dto_1.ApiResponse('Đã xảy ra lỗi hệ thống', null));
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);
//# sourceMappingURL=global-exception.filter.js.map