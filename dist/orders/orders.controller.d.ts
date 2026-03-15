import { Response } from 'express';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(dto: CreateOrderDto, user: any, res: Response): Promise<Response<any, Record<string, any>>>;
    getMyOrders(user: any, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllOrders(res: Response): Promise<Response<any, Record<string, any>>>;
    getOrderDetail(id: string, user: any, res: Response): Promise<Response<any, Record<string, any>>>;
    cancelOrder(id: string, body: {
        reason?: string;
    }, user: any, res: Response): Promise<Response<any, Record<string, any>>>;
    retryPayment(id: string, user: any, res: Response): Promise<Response<any, Record<string, any>>>;
    updateStatus(id: string, dto: UpdateOrderStatusDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
