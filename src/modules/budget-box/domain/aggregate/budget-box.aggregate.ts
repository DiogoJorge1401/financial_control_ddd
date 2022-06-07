import { AggregateRoot, BaseDomainEntity, CurrencyValueObject, DomainId, Result } from 'types-ddd';
import { ReasonDomainEntity } from '@budget-box/domain/entity';
import { BudgetDescriptionValueObject, BudgetPercentageValueObject } from '@budget-box/domain/value-object';

interface BudgetBoxAggregateProps extends BaseDomainEntity {
	ownerId: DomainId
	description: BudgetDescriptionValueObject
	balanceAvailable: CurrencyValueObject
	isPercentage: boolean
	budgetPercentage: BudgetPercentageValueObject
	reasons: Array<ReasonDomainEntity>
}

export class BudgetBoxAggregate extends AggregateRoot<BudgetBoxAggregateProps>{
	private constructor (props: BudgetBoxAggregateProps) {
		super(props, BudgetBoxAggregate.name);
	}
	get ownerId (): DomainId {
		return this.props.ownerId;
	}
	get description (): BudgetDescriptionValueObject {
		return this.props.description;
	}
	get balanceAvailable (): number {
		return this.props.balanceAvailable.value;
	}
	get isPercentage (): boolean {
		return this.props.isPercentage;
	}
	get budgetPercentage (): BudgetPercentageValueObject {
		return this.props.budgetPercentage;
	}
	get reasons (): Array<ReasonDomainEntity> {
		return this.props.reasons;
	}

	static create (props: BudgetBoxAggregateProps): Result<BudgetBoxAggregate> {
		if (!props.isPercentage && props.budgetPercentage.value < 100)
			props.budgetPercentage = BudgetPercentageValueObject.create(100).getResult();

		return Result.ok<BudgetBoxAggregate>(new BudgetBoxAggregate(props));
	}
}