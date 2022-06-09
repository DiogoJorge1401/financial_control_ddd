import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IBudgetBox, IReason, ICurrency
} from '@shared/interfaces';

@Schema({ autoCreate: true, timestamps: true, autoIndex: true })
export class BudgetBox implements IBudgetBox {
  @Prop({ immutable: true, required: true, index: true })
  id!: string;

  @Prop({ required: true })
  ownerId!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true, type: Object })
  balanceAvailable!: ICurrency;

  @Prop({ required: true })
  isPercentage!: boolean;

  @Prop({ required: true })
  budgetPercentage!: number;

  @Prop({ required: true, default: [] })
  reasons!: IReason[];

  @Prop({ default: () => new Date() })
  createdAt!: Date;

  @Prop({ default: () => new Date() })
  updatedAt!: Date;

  @Prop()
  isDeleted?: boolean;

  @Prop()
  deletedAt?: Date;
}

export const BudgetBoxSchema = SchemaFactory.createForClass(BudgetBox);

export type BudgetBoxDocument = BudgetBox & Document;