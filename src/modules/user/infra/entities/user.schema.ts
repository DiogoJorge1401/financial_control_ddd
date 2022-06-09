import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ITerm, IUser } from '@shared/interfaces';


@Schema({ autoCreate: true, timestamps: true, autoIndex: true })
export class User implements IUser {

  @Prop({ immutable: true, required: true, index: true, unique: true })
	readonly id!: string;
  
  @Prop({ required: true, unique: true, index: true })
  	email!: string;

  @Prop({ required: true })
  	password!: string;

  @Prop({ required: true })
  	terms!: Array<ITerm>;

  @Prop({ type: Date, required: true, default: new Date() })
  	createdAt!: Date;

  @Prop({ type: Date, required: true, default: new Date() })
  	updatedAt!: Date;

  @Prop({ type: Boolean, default: false })
  	isDeleted?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;