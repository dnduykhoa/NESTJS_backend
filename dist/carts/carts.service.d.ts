import { Model, Types } from 'mongoose';
import { CartDocument } from './schemas/cart.schema';
import { AddCartItemDto, UpdateCartItemDto } from './dto/cart-item.dto';
export declare class CartsService {
    private readonly cartModel;
    private readonly productModel;
    constructor(cartModel: Model<CartDocument>, productModel: Model<any>);
    getOrCreateCart(userId: string): Promise<CartDocument>;
    getCartByUserId(userId: string): Promise<{
        items: any[];
        totalItems: number;
        totalAmount: number;
        _id?: undefined;
        user?: undefined;
    } | {
        _id: any;
        user: Types.ObjectId;
        items: {
            _id: any;
            product: any;
            variantId: any;
            variantSku: any;
            quantity: any;
            unitPrice: number;
            subtotal: number;
            addedAt: any;
        }[];
        totalItems: any;
        totalAmount: number;
    }>;
    addToCart(userId: string, dto: AddCartItemDto): Promise<{
        items: any[];
        totalItems: number;
        totalAmount: number;
        _id?: undefined;
        user?: undefined;
    } | {
        _id: any;
        user: Types.ObjectId;
        items: {
            _id: any;
            product: any;
            variantId: any;
            variantSku: any;
            quantity: any;
            unitPrice: number;
            subtotal: number;
            addedAt: any;
        }[];
        totalItems: any;
        totalAmount: number;
    }>;
    updateCartItem(userId: string, itemId: string, dto: UpdateCartItemDto): Promise<{
        items: any[];
        totalItems: number;
        totalAmount: number;
        _id?: undefined;
        user?: undefined;
    } | {
        _id: any;
        user: Types.ObjectId;
        items: {
            _id: any;
            product: any;
            variantId: any;
            variantSku: any;
            quantity: any;
            unitPrice: number;
            subtotal: number;
            addedAt: any;
        }[];
        totalItems: any;
        totalAmount: number;
    }>;
    removeCartItem(userId: string, itemId: string): Promise<{
        items: any[];
        totalItems: number;
        totalAmount: number;
        _id?: undefined;
        user?: undefined;
    } | {
        _id: any;
        user: Types.ObjectId;
        items: {
            _id: any;
            product: any;
            variantId: any;
            variantSku: any;
            quantity: any;
            unitPrice: number;
            subtotal: number;
            addedAt: any;
        }[];
        totalItems: any;
        totalAmount: number;
    }>;
    clearCart(userId: string): Promise<{
        items: any[];
        totalItems: number;
        totalAmount: number;
        _id?: undefined;
        user?: undefined;
    } | {
        _id: any;
        user: Types.ObjectId;
        items: {
            _id: any;
            product: any;
            variantId: any;
            variantSku: any;
            quantity: any;
            unitPrice: number;
            subtotal: number;
            addedAt: any;
        }[];
        totalItems: any;
        totalAmount: number;
    }>;
    validateCartForCheckout(userId: string): Promise<{
        valid: boolean;
        issues: {
            productId: string;
            message: string;
        }[];
    }>;
    private buildCartResponse;
    private getAvailableStock;
}
