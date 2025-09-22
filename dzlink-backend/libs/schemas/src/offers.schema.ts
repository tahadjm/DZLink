import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '@/libs/schemas';

export type OfferDocument = Offer & Document;

@Schema({ timestamps: true })
export class Offer {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, enum: ['DZD', 'USD'] })
  currency: string;

  @Prop()
  imageUrl?: string;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
