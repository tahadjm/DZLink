import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class TimestampDocument extends Document {}

export const TimestampSchema = SchemaFactory.createForClass(TimestampDocument);
