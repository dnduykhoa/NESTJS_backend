import { Model } from 'mongoose';
import { OrderDocument } from './schemas/order.schema';
import { CartDocument } from '../carts/schemas/cart.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { MailHandler } from '../utils/mail.handler';
export declare class OrdersService {
    private readonly orderModel;
    private readonly productModel;
    private readonly cartModel;
    private readonly mailHandler;
    constructor(orderModel: Model<OrderDocument>, productModel: Model<any>, cartModel: Model<CartDocument>, mailHandler: MailHandler);
    createOrder(userId: string, dto: CreateOrderDto): Promise<any>;
    getOrdersByUser(userId: string): Promise<any[]>;
    getOrderById(id: string, userId?: string): Promise<any>;
    getAllOrders(): Promise<any[]>;
    updateOrderStatus(id: string, dto: UpdateOrderStatusDto): Promise<any>;
    cancelOrder(id: string, userId: string, reason?: string): Promise<any>;
    retryPayment(id: string, userId: string): Promise<any>;
    expireUnpaidOrders(): Promise<void>;
    private deductStock;
    private restoreStock;
    private buildOrderResponse;
}
