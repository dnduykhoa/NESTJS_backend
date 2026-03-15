import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true, unique: true, maxlength: 50 })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
