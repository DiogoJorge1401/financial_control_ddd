import { Injectable } from '@nestjs/common';
import { CreateBudgetBoxUseCase } from '@budget-box/app/use-cases/create-budget-box';
import { CreateBudgetBoxDTO } from '../app/use-cases/create-budget-box';
import { CheckResultInterceptor } from '@utils/check-result.interceptor';

@Injectable()
export class BudgetBoxService {

	constructor (
		private readonly createBudgetBoxUseCase: CreateBudgetBoxUseCase
	) { }

	async createBudgetBox (data: CreateBudgetBoxDTO): Promise<void> {
		CheckResultInterceptor(await this.createBudgetBoxUseCase.execute(data));
		return;
	}
}