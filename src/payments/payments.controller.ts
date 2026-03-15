import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Response } from 'express';
import { VnpayService } from './services/vnpay.service';
import { MomoService } from './services/momo.service';
import { OrdersService } from '../orders/orders.service';
import { OrderStatus } from '../orders/schemas/order.schema';

@Controller()
export class PaymentsController {
  constructor(
    private readonly vnpayService: VnpayService,
    private readonly momoService: MomoService,
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService,
  ) {}

  // GET /vnpay/callback — VNPay redirects here after payment
  @Get('vnpay/callback')
  async vnpayCallback(@Query() query: any, @Res() res: Response) {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    try {
      const result = this.vnpayService.verifyCallback(query);

      if (result.success) {
        try {
          await this.ordersService.updateOrderStatus(result.orderCode, {
            status: OrderStatus.CONFIRMED,
          });
        } catch (err) {
          console.error('Failed to confirm order after VNPAY payment:', err);
        }
        return res.redirect(
          `${frontendUrl}/payment/success?orderCode=${encodeURIComponent(result.orderCode)}`,
        );
      } else {
        return res.redirect(
          `${frontendUrl}/payment/failure?orderCode=${encodeURIComponent(result.orderCode)}&message=${encodeURIComponent(result.message)}`,
        );
      }
    } catch (e: any) {
      return res.redirect(
        `${frontendUrl}/payment/failure?message=${encodeURIComponent(e.message)}`,
      );
    }
  }

  // GET /momo/callback — MoMo redirects here after payment
  @Get('momo/callback')
  async momoCallback(@Query() query: any, @Res() res: Response) {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    try {
      const result = this.momoService.verifyCallback(query);

      if (result.success) {
        try {
          await this.ordersService.updateOrderStatus(result.orderCode, {
            status: OrderStatus.CONFIRMED,
          });
        } catch (err) {
          console.error('Failed to confirm order after MoMo payment:', err);
        }
        return res.redirect(
          `${frontendUrl}/payment/success?orderCode=${encodeURIComponent(result.orderCode)}`,
        );
      } else {
        return res.redirect(
          `${frontendUrl}/payment/failure?orderCode=${encodeURIComponent(result.orderCode)}&message=${encodeURIComponent(result.message)}`,
        );
      }
    } catch (e: any) {
      return res.redirect(
        `${frontendUrl}/payment/failure?message=${encodeURIComponent(e.message)}`,
      );
    }
  }

  // POST /momo/ipn — MoMo server-to-server IPN notification
  @Post('momo/ipn')
  async momoIpn(@Body() body: any, @Res() res: Response) {
    try {
      const result = this.momoService.verifyCallback(body);

      if (result.success) {
        try {
          await this.ordersService.updateOrderStatus(result.orderCode, {
            status: OrderStatus.CONFIRMED,
          });
        } catch (err) {
          console.error('Failed to confirm order after MoMo IPN:', err);
        }
      }

      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (e: any) {
      console.error('MoMo IPN processing error:', e);
      return res.status(HttpStatus.NO_CONTENT).send();
    }
  }
}
