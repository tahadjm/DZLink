import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TimestampDocument } from './timestamp.schema';
import { Role } from './user.enums';

@Schema({ timestamps: true, versionKey: false })
export class User extends TimestampDocument {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: false, trim: true, lowercase: true })
  bio: string;

  @Prop({ required: false, trim: true, lowercase: true })
  phone: string;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
  })
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };

  @Prop({ required: false, trim: true, lowercase: true })
  website?: string;

  @Prop({ type: Types.ObjectId, ref: 'City' })
  city?: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Tag' }] })
  tags?: Types.ObjectId[];

  @Prop({ select: true })
  avatarUrl?: string;

  @Prop({
    type: String,
    enum: Role,
    default: [Role.Freelance],
    select: true,
  })
  role: Role;

  @Prop({ type: Date, default: null, select: false })
  firstLoginAt?: Date | null;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
