import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { ApiResponse } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // POST /orders — create order (from cart or direct items)
  @Post()
  async createOrder(
    @Body() dto: CreateOrderDto,
    @CurrentUser() user: any,
    @Res() res: Response,
  ) {
    try {
      const order = await this.ordersService.createOrder(user._id || user.id, dto);
      return res
        .status(HttpStatus.CREATED)
        .json(new ApiResponse('Tạo đơn hàng thành công', order));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // GET /orders/my — get current user's orders
  @Get('my')
  async getMyOrders(@CurrentUser() user: any, @Res() res: Response) {
    try {
      const orders = await this.ordersService.getOrdersByUser(user._id || user.id);
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Lấy danh sách đơn hàng thành công', orders));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // GET /orders — admin: get all orders
  @Get()
  async getAllOrders(@Res() res: Response) {
    try {
      const orders = await this.ordersService.getAllOrders();
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Lấy tất cả đơn hàng thành công', orders));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // GET /orders/:id — get order detail
  @Get(':id')
  async getOrderDetail(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Res() res: Response,
  ) {
    try {
      const order = await this.ordersService.getOrderById(id, user._id || user.id);
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Lấy thông tin đơn hàng thành công', order));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // POST /orders/:id/cancel — user cancels own order
  @Post(':id/cancel')
  async cancelOrder(
    @Param('id') id: string,
    @Body() body: { reason?: string },
    @CurrentUser() user: any,
    @Res() res: Response,
  ) {
    try {
      const order = await this.ordersService.cancelOrder(
        id,
        user._id || user.id,
        body?.reason,
      );
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Hủy đơn hàng thành công', order));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // POST /orders/:id/retry-payment — retry online payment
  @Post(':id/retry-payment')
  async retryPayment(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Res() res: Response,
  ) {
    try {
      const result = await this.ordersService.retryPayment(id, user._id || user.id);
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Tạo lại link thanh toán thành công', result));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  // PATCH /orders/:id/status — admin updates order status
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOrderStatusDto,
    @Res() res: Response,
  ) {
    try {
      const order = await this.ordersService.updateOrderStatus(id, dto);
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Cập nhật trạng thái đơn hàng thành công', order));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }
}
