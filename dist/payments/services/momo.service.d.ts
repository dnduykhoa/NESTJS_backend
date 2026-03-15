export declare class MomoService {
    private readonly partnerCode;
    private readonly accessKey;
    private readonly secretKey;
    private readonly apiUrl;
    private readonly returnUrl;
    private readonly ipnUrl;
    constructor();
    createPaymentUrl(orderId: string, orderCode: string, amount: number): Promise<string>;
    verifyCallback(body: any): {
        success: boolean;
        orderCode: string;
        message: string;
    };
    private hmacSHA256;
    private httpPost;
}
