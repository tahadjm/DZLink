import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class City {
  @Prop({ required: true, unique: true, trim: true })
  name: string;
}

export type CityDocument = City & Document;
export const CitySchema = SchemaFactory.createForClass(City);
