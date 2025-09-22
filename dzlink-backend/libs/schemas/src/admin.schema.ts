import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema({ timestamps: true })
export class Admin {
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password_hash: string;

  @Prop()
  phone?: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
