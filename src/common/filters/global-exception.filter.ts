import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../dto/api-response.dto';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Xử lý lỗi validation từ ValidationPipe
    if (exception instanceof BadRequestException) {
      const exResponse = exception.getResponse() as any;
      if (exResponse?.message && Array.isArray(exResponse.message)) {
        const errors: Record<string, string> = {};
        for (const msg of exResponse.message) {
          const parts = msg.split(' ');
          errors['validation'] = msg;
        }
        return response.status(HttpStatus.BAD_REQUEST).json(
          new ApiResponse('Vui lòng kiểm tra lại thông tin', errors),
        );
      }
      return response.status(HttpStatus.BAD_REQUEST).json(
        new ApiResponse(exResponse?.message || exception.message, null),
      );
    }

    // Xử lý HttpException tổng quát
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      return response.status(status).json(
        new ApiResponse(exception.message, null),
      );
    }

    // Xử lý RuntimeException / Error thông thường
    if (exception instanceof Error) {
      return response.status(HttpStatus.BAD_REQUEST).json(
        new ApiResponse(exception.message, null),
      );
    }

    // Fallback
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
      new ApiResponse('Đã xảy ra lỗi hệ thống', null),
    );
  }
}
