import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, maxlength: 50 })
  username: string;

  @Prop({ required: false, default: null })
  password: string; // null cho user đăng nhập Google

  @Prop({ required: true, unique: true, lowercase: true, maxlength: 100 })
  email: string;

  @Prop({ default: '' })
  fullName: string;

  @Prop({ default: null })
  phone: string;

  @Prop({ default: null })
  birthDate: Date;

  @Prop({ default: 'https://i.sstatic.net/l60Hf.png' })
  avatarUrl: string;

  // provider: 'local' | 'google'
  @Prop({ default: 'local', maxlength: 50 })
  provider: string;

  @Prop({ default: null })
  providerId: string; // Google sub ID

  @Prop({ type: Types.ObjectId, ref: 'Role', required: false, default: null })
  role: Types.ObjectId;

  @Prop({ default: false })
  twoFactorEnabled: boolean;

  @Prop({ default: null })
  resetPasswordToken: string;

  @Prop({ default: null })
  resetPasswordExpires: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: 0, min: 0 })
  loginCount: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Pre-save hook: bcrypt hash password
UserSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.index({ username: 1, email: 1 });
