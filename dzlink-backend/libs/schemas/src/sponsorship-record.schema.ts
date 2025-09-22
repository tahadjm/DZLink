import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SponsorshipRecordDocument = SponsorshipRecord & Document;

@Schema({ timestamps: true })
export class SponsorshipRecord {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'SponsorshipPack', required: true })
  packId: Types.ObjectId;

  @Prop({ required: true, enum: ['bronze', 'silver', 'gold'] })
  packKey: 'bronze' | 'silver' | 'gold';

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({
    required: true,
    enum: ['active', 'expired', 'cancelled'],
    default: 'active',
  })
  status: string;
}

export const SponsorshipRecordSchema =
  SchemaFactory.createForClass(SponsorshipRecord);
