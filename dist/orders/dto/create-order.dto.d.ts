export declare class OrderItemDto {
    productId: string;
    variantId?: string;
    quantity: number;
}
export declare class CreateOrderDto {
    fullName: string;
    phone: string;
    email?: string;
    shippingAddress: string;
    note?: string;
    paymentMethod: string;
    items?: OrderItemDto[];
}
