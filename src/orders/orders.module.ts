import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order, OrderSchema } from './schemas/order.schema';
import { ProductSchema } from '../products/schemas/product.schema';
import { Cart, CartSchema } from '../carts/schemas/cart.schema';
import { MailHandler } from '../utils/mail.handler';
import { PaymentDeadlineScheduler } from './payment-deadline.scheduler';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: 'Product', schema: ProductSchema },
      { name: Cart.name, schema: CartSchema },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, MailHandler, PaymentDeadlineScheduler],
  exports: [OrdersService],
})
export class OrdersModule {}
