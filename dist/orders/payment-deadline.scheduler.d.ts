import { OrdersService } from './orders.service';
export declare class PaymentDeadlineScheduler {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    handleExpiredOrders(): Promise<void>;
}
