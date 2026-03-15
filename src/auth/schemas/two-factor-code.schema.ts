import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TwoFactorCodeDocument = TwoFactorCode & Document;

@Schema()
export class TwoFactorCode {
  @Prop({ required: true, index: true })
  emailOrPhone: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  expiryDate: Date;

  @Prop({ default: false })
  used: boolean;
}

export const TwoFactorCodeSchema = SchemaFactory.createForClass(TwoFactorCode);
TwoFactorCodeSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 }); // TTL index tự xóa
