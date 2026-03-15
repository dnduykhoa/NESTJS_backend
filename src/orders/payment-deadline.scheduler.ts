import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrdersService } from './orders.service';

@Injectable()
export class PaymentDeadlineScheduler {
  constructor(private readonly ordersService: OrdersService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleExpiredOrders() {
    try {
      await this.ordersService.expireUnpaidOrders();
    } catch (error) {
      console.error('Error expiring unpaid orders:', error);
    }
  }
}
