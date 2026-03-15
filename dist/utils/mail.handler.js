"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailHandler = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let MailHandler = class MailHandler {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER || '',
                pass: process.env.MAIL_PASS || '',
            },
        });
    }
    async sendPasswordResetEmail(email, resetToken) {
        const mailOptions = {
            from: `"TechStore" <${process.env.MAIL_USER}>`,
            to: email,
            subject: 'Đặt lại mật khẩu - TechStore',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #2563eb;">Yêu cầu đặt lại mật khẩu</h2>
          <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản TechStore.</p>
          <p>Mã xác thực của bạn là:</p>
          <div style="font-size: 32px; font-weight: bold; color: #16a34a; letter-spacing: 8px; text-align: center; padding: 16px; background: #f0fdf4; border-radius: 6px;">
            ${resetToken}
          </div>
          <p style="color: #6b7280; font-size: 13px; margin-top: 16px;">Mã này có hiệu lực trong <strong>15 phút</strong>. Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
        </div>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            return { success: true };
        }
        catch (error) {
            console.error('Error sending password reset email:', error);
            return { success: false, message: 'Không thể gửi email' };
        }
    }
    async sendTwoFactorCode(emailOrPhone, code) {
        const mailOptions = {
            from: `"TechStore" <${process.env.MAIL_USER}>`,
            to: emailOrPhone,
            subject: 'Mã xác thực 2 bước - TechStore',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #2563eb;">Xác thực 2 bước</h2>
          <p>Mã xác thực đăng nhập của bạn là:</p>
          <div style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 8px; text-align: center; padding: 16px; background: #eff6ff; border-radius: 6px;">
            ${code}
          </div>
          <p style="color: #6b7280; font-size: 13px; margin-top: 16px;">Mã này có hiệu lực trong <strong>5 phút</strong>. Không chia sẻ mã này với bất kỳ ai.</p>
        </div>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            return { success: true };
        }
        catch (error) {
            console.error('Error sending 2FA code:', error);
            return { success: false, message: 'Không thể gửi mã xác thực' };
        }
    }
    async sendOrderConfirmationEmail(email, orderCode, totalAmount) {
        const mailOptions = {
            from: `"TechStore" <${process.env.MAIL_USER}>`,
            to: email,
            subject: `Xác nhận đơn hàng #${orderCode} - TechStore`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #16a34a;">Đặt hàng thành công!</h2>
          <p>Đơn hàng <strong>#${orderCode}</strong> của bạn đã được xác nhận.</p>
          <p>Tổng tiền: <strong style="color: #dc2626;">${totalAmount.toLocaleString('vi-VN')} đ</strong></p>
          <p>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất. Cảm ơn bạn đã mua hàng!</p>
        </div>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
        }
        catch (error) {
            console.error('Error sending order confirmation email:', error);
        }
    }
    async sendOrderCancelledEmail(email, orderCode, reason) {
        const mailOptions = {
            from: `"TechStore" <${process.env.MAIL_USER}>`,
            to: email,
            subject: `Đơn hàng #${orderCode} đã bị hủy - TechStore`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #dc2626;">Đơn hàng đã bị hủy</h2>
          <p>Đơn hàng <strong>#${orderCode}</strong> của bạn đã bị hủy.</p>
          ${reason ? `<p>Lý do: ${reason}</p>` : ''}
          <p>Nếu bạn có thắc mắc, vui lòng liên hệ với chúng tôi.</p>
        </div>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
        }
        catch (error) {
            console.error('Error sending order cancelled email:', error);
        }
    }
    async sendPaymentPendingEmail(email, orderCode, paymentUrl, deadlineMinutes = 30) {
        const mailOptions = {
            from: `"TechStore" <${process.env.MAIL_USER}>`,
            to: email,
            subject: `Hoàn tất thanh toán đơn hàng #${orderCode} - TechStore`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #d97706;">Chờ thanh toán</h2>
          <p>Đơn hàng <strong>#${orderCode}</strong> đang chờ thanh toán.</p>
          <p>Vui lòng hoàn tất thanh toán trong <strong>${deadlineMinutes} phút</strong> để đơn hàng không bị hủy tự động.</p>
          <a href="${paymentUrl}" style="display: inline-block; padding: 12px 24px; background: #2563eb; color: #fff; border-radius: 6px; text-decoration: none; margin-top: 12px;">Thanh toán ngay</a>
        </div>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
        }
        catch (error) {
            console.error('Error sending payment pending email:', error);
        }
    }
    async sendPaymentExpiredEmail(email, orderCode) {
        const mailOptions = {
            from: `"TechStore" <${process.env.MAIL_USER}>`,
            to: email,
            subject: `Đơn hàng #${orderCode} đã hết hạn thanh toán - TechStore`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #dc2626;">Đơn hàng hết hạn thanh toán</h2>
          <p>Đơn hàng <strong>#${orderCode}</strong> đã bị hủy tự động do quá hạn thanh toán.</p>
          <p>Bạn có thể đặt hàng lại tại website của chúng tôi. Cảm ơn bạn!</p>
        </div>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
        }
        catch (error) {
            console.error('Error sending payment expired email:', error);
        }
    }
};
exports.MailHandler = MailHandler;
exports.MailHandler = MailHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailHandler);
//# sourceMappingURL=mail.handler.js.map