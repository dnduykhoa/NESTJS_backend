import { Response } from 'express';
import { VnpayService } from './services/vnpay.service';
import { MomoService } from './services/momo.service';
import { OrdersService } from '../orders/orders.service';
export declare class PaymentsController {
    private readonly vnpayService;
    private readonly momoService;
    private readonly ordersService;
    constructor(vnpayService: VnpayService, momoService: MomoService, ordersService: OrdersService);
    vnpayCallback(query: any, res: Response): Promise<void>;
    momoCallback(query: any, res: Response): Promise<void>;
    momoIpn(body: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
