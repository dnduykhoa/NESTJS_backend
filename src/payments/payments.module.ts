import { Module, forwardRef } from '@nestjs/common';
import { VnpayService } from './services/vnpay.service';
import { MomoService } from './services/momo.service';
import { PaymentsController } from './payments.controller';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [forwardRef(() => OrdersModule)],
  controllers: [PaymentsController],
  providers: [VnpayService, MomoService],
  exports: [VnpayService, MomoService],
})
export class PaymentsModule {}
