import { Injectable } from '@nestjs/common';
import { CreateBudgetBoxUseCase } from '@budget-box/app/use-cases/create-budget-box/create-budget-box.use-case';

@Injectable()
export class BudgetBoxService {

	constructor (
		private readonly createBudgetBoxUseCase: CreateBudgetBoxUseCase
	){}

	async createBudgetBox (): Promise<void> {
		console.log(await this.createBudgetBoxUseCase.execute(null));
		return; 
	}
}