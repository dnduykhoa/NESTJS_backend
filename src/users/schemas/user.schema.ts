import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';

@Schema( { timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  username!: string;

  @Prop({ required: false })
  password?: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email!: string;

  @Prop({ default: '' })
  fullName?: string;

  @Prop()
  birthday?: Date;

  @Prop({ default: 'https://i.sstatic.net/l60Hf.png' })
  avatarUrl?: string;

  @Prop({ default: false })
  status?: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Role', required: true })
  role!: Types.ObjectId;

  @Prop({ default: 0, min: 0 })
  loginCount?: number;

  @Prop({ default: false })
  isDeleted?: boolean;

  @Prop({ unique: true, sparse: true })
  googleId?: string;

  @Prop()
  resetPasswordToken?: string;

  @Prop()
  resetPasswordExpires?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function() {
  if (this.password && this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.index({ username: 1, email: 1 });