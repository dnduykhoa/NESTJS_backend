export declare class MailHandler {
    private transporter;
    constructor();
    sendPasswordResetEmail(email: string, resetToken: string): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
}
