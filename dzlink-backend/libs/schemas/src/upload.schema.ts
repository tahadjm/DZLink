// libs/schemas/upload.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Upload extends Document {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  originalName: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  mimetype: string;

  @Prop({ required: true })
  size: number;

  @Prop()
  url: string; // Public URL if serving statically
}

export type UploadDocument = Upload & Document;
export const UploadSchema = SchemaFactory.createForClass(Upload);
