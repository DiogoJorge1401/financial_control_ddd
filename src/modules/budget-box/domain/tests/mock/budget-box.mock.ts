import { BudgetBoxAggregate } from '@budget-box/domain/aggregate';
import { IBudgetBox } from '@shared/interfaces/budget-box-model.interface';
import { IMockEntity } from '@shared/interfaces/entity-mock.interface';
import { ChangesObserver, CurrencyValueObject, DomainId, Result } from 'types-ddd';
import { CURRENCY } from '@config/env';
import { ReasonMock } from './';
import { BudgetDescriptionValueObject, BudgetPercentageValueObject } from '@budget-box/domain/value-object';

export class BudgetBoxMock implements IMockEntity<BudgetBoxAggregate, IBudgetBox>{
	private readonly reasonMock: ReasonMock;

	constructor () {
		this.reasonMock = new ReasonMock();
	}

	domain (props?: Partial<IBudgetBox>): Result<BudgetBoxAggregate, string> {
		const ID = DomainId.create(props?.id ?? 'valid_id');

		const ownerId = DomainId.create(props?.ownerId ?? 'valid_owner_id');

		const balanceAvailable = CurrencyValueObject.create({
			value: props?.balanceAvailable?.value ?? 100,
			currency: CURRENCY
		});

		const budgetPercentage = BudgetPercentageValueObject.create(props?.budgetPercentage ?? 100);

		const description = BudgetDescriptionValueObject.create(props?.description ?? 'valid_description');

		const reasons = props?.reasons?.map((reason) => this.reasonMock.domain(reason)) ?? [this.reasonMock.domain()];

		const observer = ChangesObserver.init<unknown>(reasons);
		observer.add(balanceAvailable);
		observer.add(budgetPercentage);
		observer.add(description);

		const result = observer.getResult();
		if (result.isFailure)
			return Result.fail(result.errorValue());

		return BudgetBoxAggregate.create({
			ID,
			balanceAvailable: balanceAvailable.getResult(),
			budgetPercentage: budgetPercentage.getResult(),
			description: description.getResult(),
			isPercentage: props?.isPercentage ?? false,
			ownerId,
			reasons: reasons.map(reson => reson.getResult()),
			createdAt: props?.createdAt ?? new Date('2022-01-01'),
			updatedAt: props?.updatedAt ?? new Date('2022-01-01'),
			deletedAt: undefined,
			isDeleted: false,
		});

	}
	model (props?: Partial<IBudgetBox>): IBudgetBox {
		return {
			id: props?.id ?? 'valid_id',
			balanceAvailable: props?.balanceAvailable ?? { value: 1000, currency: CURRENCY },
			budgetPercentage: props?.budgetPercentage ?? 100,
			description: props?.description ?? 'valid_description',
			isPercentage: props?.isPercentage ?? false,
			ownerId: props?.ownerId ?? 'valid_owner_id',
			reasons: props?.reasons ?? [this.reasonMock.model()],
			createdAt: props?.createdAt ?? new Date('2022-01-01'),
			updatedAt: props?.updatedAt ?? new Date('2022-01-01'),
			deletedAt: undefined,
			isDeleted: false,
		};
	}
}