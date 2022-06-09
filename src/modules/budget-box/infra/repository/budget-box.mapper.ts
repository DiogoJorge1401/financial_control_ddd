import { BudgetBoxAggregate } from '@budget-box/domain/aggregate';
import { ReasonDomainEntity } from '@budget-box/domain/entity';
import { BudgetDescriptionValueObject, BudgetPercentageValueObject } from '@budget-box/domain/value-object';
import { IBudgetBox } from '@shared/interfaces/budget-box-model.interface';
import { ChangesObserver, CurrencyValueObject, DomainId, Result, TMapper } from 'types-ddd';
import { IReason } from '@shared/interfaces/reason-model.interface';

export class BudgetBoxMapperToDomain implements TMapper<IBudgetBox, BudgetBoxAggregate>{
	constructor (
		private readonly mapper: TMapper<IReason, ReasonDomainEntity>
	) { }
	map (target: IBudgetBox): Result<BudgetBoxAggregate, string> {
		const balanceAvailable = CurrencyValueObject.create(target.balanceAvailable);
		const budgetPercentage = BudgetPercentageValueObject.create(target.budgetPercentage);
		const description = BudgetDescriptionValueObject.create(target.description);
		const reasons = target.reasons.map((reason) => this.mapper.map(reason));

		const observer = ChangesObserver.init<unknown>([balanceAvailable, budgetPercentage, description, ...reasons]);
		const result = observer.getResult();
		if (result.isFailure)
			return Result.fail(result.errorValue(), 'UNPROCESSABLE_ENTITY');


		return BudgetBoxAggregate.create({
			ID: DomainId.create(target.id),
			balanceAvailable: balanceAvailable.getResult(),
			budgetPercentage: budgetPercentage.getResult(),
			description: description.getResult(),
			isPercentage: target.isPercentage,
			ownerId: DomainId.create(target.ownerId),
			reasons: reasons.map(reason => reason.getResult()),
			createdAt: target.createdAt,
			updatedAt: target.updatedAt,
			deletedAt: undefined,
			isDeleted: false
		});
	}
}