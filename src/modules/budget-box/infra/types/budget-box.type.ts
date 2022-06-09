import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ICurrency, IReason } from '@shared/interfaces';
import { ReasonType } from '.';

@ObjectType()
export class BudgetBoxCurrencyType {
  @Field()
  	value!: number;

  @Field(() => String)
  	currency: ICurrency['currency'];
}

@ObjectType()
export class BudgetBoxType {
  @Field(() => ID)
  	id!: string;

  @Field()
  	description!: string;

  @Field(() => BudgetBoxCurrencyType)
  	balanceAvailable!: ICurrency;

  @Field()
  	isPercentage!: boolean;

  @Field()
  	budgetPercentage!: number;

  @Field(() => [ReasonType])
  	reasons!: Array<IReason>;

  @Field()
  	createdAt!: Date;

  @Field()
  	updatedAt!: Date;

}