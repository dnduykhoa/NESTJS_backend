import { Response } from 'express';
export declare class SseService {
    private clients;
    subscribe(res: Response): void;
    broadcastProductUpdate(product: any): void;
    broadcastVariantUpdate(productId: string, variant: any): void;
    private sendToAll;
}
