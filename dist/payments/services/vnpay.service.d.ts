export declare class VnpayService {
    private readonly tmnCode;
    private readonly hashSecret;
    private readonly baseUrl;
    private readonly returnUrl;
    constructor();
    createPaymentUrl(orderId: string, orderCode: string, amount: number, ipAddr: string, orderInfo: string): string;
    verifyCallback(query: any): {
        success: boolean;
        orderCode: string;
        message: string;
    };
    private hmacSHA512;
    private formatDate;
}
