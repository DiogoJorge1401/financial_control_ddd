import { AggregateRoot, BaseDomainEntity, DomainId, Result } from 'types-ddd';
import { ReasonDomainEntity } from '@domain/budget-box/entities';
import { BudgetDescriptionValueObject, BudgetPercentageValueObject } from '@domain/budget-box/value-objects';

interface BudgetBoxAggregateProps extends BaseDomainEntity{
  ownerId: DomainId
  description: BudgetDescriptionValueObject
  balanceAvailable: number
  isPercentage: boolean
  budgetPercentage: BudgetPercentageValueObject
  reasons: Array<ReasonDomainEntity>
}

export class BudgetBoxAggregate extends AggregateRoot<BudgetBoxAggregateProps>{
	private constructor (props: BudgetBoxAggregateProps) {
		super(props, BudgetBoxAggregate.name);
	}
	get ownerId (): DomainId { return this.props.ownerId; }
	get description (): BudgetDescriptionValueObject { return this.props.description; }
	get balanceAvailable (): number { return this.props.balanceAvailable; }
	get isPercentage (): boolean { return this.props.isPercentage; }
	get budgetPercentage (): BudgetPercentageValueObject { return this.props.budgetPercentage; }
	get reasons (): Array<ReasonDomainEntity> { return this.props.reasons; }

	static create (props: BudgetBoxAggregateProps): Result<BudgetBoxAggregate> {
		if(!props.isPercentage && props.budgetPercentage.value<100)
			props.budgetPercentage = BudgetPercentageValueObject.create(100).getResult();
    
		return Result.ok<BudgetBoxAggregate>(new BudgetBoxAggregate(props));
	}
}