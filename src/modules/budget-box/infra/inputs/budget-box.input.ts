import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBudgetBoxInput {
  @Field()
  	description!: string;

  @Field()
  	isPercentage!: boolean;

  @Field(() => Float)
  	budgetPercentage!: number;
}