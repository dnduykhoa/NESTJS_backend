import { Response } from 'express';
import { CartsService } from './carts.service';
import { AddCartItemDto, UpdateCartItemDto } from './dto/cart-item.dto';
export declare class CartsController {
    private readonly cartsService;
    constructor(cartsService: CartsService);
    getCart(userId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    validateCart(userId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    addItem(userId: string, dto: AddCartItemDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updateItem(userId: string, itemId: string, dto: UpdateCartItemDto, res: Response): Promise<Response<any, Record<string, any>>>;
    removeItem(userId: string, itemId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    clearCart(userId: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
