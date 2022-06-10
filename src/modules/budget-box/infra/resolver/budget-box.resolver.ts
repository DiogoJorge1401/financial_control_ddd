import { BudgetBoxMock } from '@budget-box/domain/tests/mock';
import { BudgetBoxType } from '@budget-box/infra/types';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUserId } from '@user/infra/services/decorators';
import { JWTAuthGuard } from '@user/infra/services/guards';
import { BudgetBoxService } from '@budget-box/infra/budget-box.service';
import { CreateBudgetBoxInput } from '@budget-box/infra/inputs';

@Resolver(() => BudgetBoxType)
export class BudgetBoxResolver {

	constructor (
		private readonly service: BudgetBoxService
	) { }

	@Mutation(() => Boolean)
	@UseGuards(JWTAuthGuard)
	async createBudgetBox (
		@Args(CreateBudgetBoxInput.name)
			createBudgetBoxInput: CreateBudgetBoxInput,
		@GetUserId() userId: string
	) {
		const isSuccess = true;
		await this.service.createBudgetBox({
			...createBudgetBoxInput,
			ownerId: userId
		});
		return isSuccess;
	}

	@Query(() => [BudgetBoxType])
	@UseGuards(JWTAuthGuard)
	async getBudgetBoxes (): Promise<Array<BudgetBoxType>> {
		const bb = new BudgetBoxMock().model();
		return [bb];
	}
}