import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { operationalSystem } from '@domain/user/value-objects';
import { Document } from 'mongoose';



interface IUserAgent {
  name: string,
  version: string,
  os: operationalSystem,
  type: string
}

interface Term {
  ip: string,
  acceptedAt: Date,
  userAgent: IUserAgent,
}

@Schema({ autoCreate: true, timestamps: true, autoIndex: true })
export class User {

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: [] })
  budgetBoxIds?: Array<string>;

  @Prop({ default: 0 })
  totalBalanceAvailable: number;

  @Prop({ required: true })
  terms: Array<Term>;
}

export const UserSchema = SchemaFactory.createForClass(User)

export type UserDocument = User & Document