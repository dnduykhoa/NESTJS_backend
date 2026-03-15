export declare class MailHandler {
    private transporter;
    constructor();
    sendPasswordResetEmail(email: string, resetToken: string): Promise<{
        success: boolean;
        message?: string;
    }>;
    sendTwoFactorCode(emailOrPhone: string, code: string): Promise<{
        success: boolean;
        message?: string;
    }>;
    sendOrderConfirmationEmail(email: string, orderCode: string, totalAmount: number): Promise<void>;
    sendOrderCancelledEmail(email: string, orderCode: string, reason?: string): Promise<void>;
    sendPaymentPendingEmail(email: string, orderCode: string, paymentUrl: string, deadlineMinutes?: number): Promise<void>;
    sendPaymentExpiredEmail(email: string, orderCode: string): Promise<void>;
}
