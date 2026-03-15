import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CartsService } from './carts.service';
import { AddCartItemDto, UpdateCartItemDto } from './dto/cart-item.dto';
import { ApiResponse } from '../common/dto/api-response.dto';

@Controller('cart')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  // GET /cart?userId=
  @Get()
  async getCart(@Query('userId') userId: string, @Res() res: Response) {
    try {
      if (!userId) throw new Error('userId là bắt buộc');
      const cart = await this.cartsService.getCartByUserId(userId);
      return res.status(HttpStatus.OK).json(new ApiResponse('Lấy giỏ hàng thành công', cart));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // GET /cart/validate?userId=
  @Get('validate')
  async validateCart(@Query('userId') userId: string, @Res() res: Response) {
    try {
      if (!userId) throw new Error('userId là bắt buộc');
      const result = await this.cartsService.validateCartForCheckout(userId);
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Kiểm tra giỏ hàng thành công', result));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // POST /cart/items?userId=
  @Post('items')
  async addItem(
    @Query('userId') userId: string,
    @Body() dto: AddCartItemDto,
    @Res() res: Response,
  ) {
    try {
      if (!userId) throw new Error('userId là bắt buộc');
      const cart = await this.cartsService.addToCart(userId, dto);
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Thêm sản phẩm vào giỏ hàng thành công', cart));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // PUT /cart/items/:itemId?userId=
  @Put('items/:itemId')
  async updateItem(
    @Query('userId') userId: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateCartItemDto,
    @Res() res: Response,
  ) {
    try {
      if (!userId) throw new Error('userId là bắt buộc');
      const cart = await this.cartsService.updateCartItem(userId, itemId, dto);
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Cập nhật giỏ hàng thành công', cart));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // DELETE /cart/items/:itemId?userId=
  @Delete('items/:itemId')
  async removeItem(
    @Query('userId') userId: string,
    @Param('itemId') itemId: string,
    @Res() res: Response,
  ) {
    try {
      if (!userId) throw new Error('userId là bắt buộc');
      const cart = await this.cartsService.removeCartItem(userId, itemId);
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Xóa sản phẩm khỏi giỏ hàng thành công', cart));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // DELETE /cart?userId=
  @Delete()
  async clearCart(@Query('userId') userId: string, @Res() res: Response) {
    try {
      if (!userId) throw new Error('userId là bắt buộc');
      const cart = await this.cartsService.clearCart(userId);
      return res.status(HttpStatus.OK).json(new ApiResponse('Xóa toàn bộ giỏ hàng thành công', cart));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }
}
