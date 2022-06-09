import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { BudgetBoxService } from '../budget-box.service';
import { BudgetBoxType } from '@budget-box/infra/types';
import { BudgetBoxMock } from '@budget-box/domain/tests/mock';
import { JWTAuthGuard } from '@user/infra/services/guards';
import { UseGuards } from '@nestjs/common';

@Resolver(() => BudgetBoxType)
export class BudgetBoxResolver {

	constructor (
    private readonly service: BudgetBoxService
	) { }

  @Mutation(() => Boolean)
  @UseGuards(JWTAuthGuard)
	async createBudgetBox () {
		const isSuccess = true;
		await this.service.createBudgetBox();
		return isSuccess;
	}

  @Query(() => [BudgetBoxType])
  @UseGuards(JWTAuthGuard)
  async getBudgetBoxes (): Promise<Array<BudgetBoxType>> {
  	const bb = new BudgetBoxMock().model();
  	return [bb];
  }
}