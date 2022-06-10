import { BudgetBoxAggregate } from '@budget-box/domain/aggregate';
import { IBudgetBoxRepository } from '@budget-box/domain/interfaces';
import { BudgetDescriptionValueObject, BudgetPercentageValueObject } from '@budget-box/domain/value-object';
import { CURRENCY } from '@config/env';
import { Inject, Injectable } from '@nestjs/common';
import { ChangesObserver, CurrencyValueObject, DomainId, IUseCase, Result } from 'types-ddd';
import { CreateBudgetBoxDTO } from '.';

@Injectable()
export class CreateBudgetBoxUseCase implements IUseCase<CreateBudgetBoxDTO, Result<void>>{

	constructor (
    @Inject('BudgetBoxRepository')
    private readonly repository: IBudgetBoxRepository
	) { this.repository; }

	async execute (dto: CreateBudgetBoxDTO): Promise<Result<void, string>> {
		const budgetPercentageOnError = BudgetPercentageValueObject.create(dto.budgetPercentage);
		const descriptionOnError = BudgetDescriptionValueObject.create(dto.description);
		const balanceAvailableOnError = CurrencyValueObject.create({
			currency: CURRENCY,
			value: 0
		});

		const observer = ChangesObserver.init<unknown>([
			budgetPercentageOnError,
			descriptionOnError,
			balanceAvailableOnError
		]);
		const result = observer.getResult();
		if (result.isFailure)
			return Result.fail(result.errorValue());

		const budgetBoxOnError = BudgetBoxAggregate.create({
			ID: DomainId.create(),
			ownerId: DomainId.create(dto.ownerId),
			isPercentage: dto.isPercentage,
			budgetPercentage: budgetPercentageOnError.getResult(),
			description: descriptionOnError.getResult(),
			balanceAvailable: balanceAvailableOnError.getResult(),
			reasons: []
		});

		const budgetBox = budgetBoxOnError.getResult();

		await this.repository.save(budgetBox);

		return Result.ok(budgetBox);
	}
}