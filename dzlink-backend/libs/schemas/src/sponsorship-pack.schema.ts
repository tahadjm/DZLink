// sponsorship-pack.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SponsorshipPackDocument = SponsorshipPack & Document;

// Centralized constants
export const PACK_KEYS = ['bronze', 'silver', 'gold'] as const;
export type PackKey = (typeof PACK_KEYS)[number];

export const CURRENCIES = ['DZD', 'USD', 'EUR'] as const;
export type Currency = (typeof CURRENCIES)[number];

@Schema({ timestamps: true })
export class SponsorshipPack {
  @Prop({ required: true, enum: PACK_KEYS })
  key: PackKey;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number; // stored in smallest unit (e.g. cents or DZD)

  @Prop({ required: true, enum: CURRENCIES, default: 'DZD' })
  currency: Currency;

  @Prop({ required: true })
  durationDays: number;

  @Prop({ type: [String], default: [] })
  benefits: string[];

  @Prop()
  priorityScore?: number;
}

export const SponsorshipPackSchema =
  SchemaFactory.createForClass(SponsorshipPack);
