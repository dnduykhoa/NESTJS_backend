import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailHandler {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER || '',
        pass: process.env.MAIL_PASS || '',
      },
    });
  }

  async sendPasswordResetEmail(email: string, resetToken: string) {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Đặt lại mật khẩu - Tech Store',
      html: `
        <h2>Yêu cầu đặt lại mật khẩu</h2>
        <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.</p>
        <p>Mã xác thực của bạn là: <strong style="font-size: 24px; color: #4CAF50;">${resetToken}</strong></p>
        <p>Mã này có hiệu lực trong <strong>15 phút</strong>.</p>
        <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
        <br>
        <p>Trân trọng,</p>
        <p>Tech Store Team</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, message: 'Không thể gửi email' };
    }
  }
}
