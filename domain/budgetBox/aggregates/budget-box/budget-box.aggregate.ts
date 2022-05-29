import { AggregateRoot, UniqueEntityID, Result } from "@/domain/shared";
import { UserIdValueObject } from '@/domain/user/valueObjects';
import { ReasonDomainEntity } from '../../entities';
import { BudgetDescriptionValueObject, BudgetPercentageValueObject } from '../../valueObjects';

interface BudgetBoxAggregateProps {
  ownerId: UserIdValueObject
  description: BudgetDescriptionValueObject
  balanceAvailable: number
  isPercentage: boolean
  budgetPercentage: BudgetPercentageValueObject
  reasons: Array<ReasonDomainEntity>
}

export class BudgetBoxAggregate extends AggregateRoot<BudgetBoxAggregateProps>{
	private constructor (props: BudgetBoxAggregateProps, id?: UniqueEntityID) {
		super(props, id);
	}
	get ownerId (): UserIdValueObject { return this.props.ownerId; }
	get description (): BudgetDescriptionValueObject { return this.props.description; }
	get balanceAvailable (): number { return this.props.balanceAvailable; }
	get isPercentage (): boolean { return this.props.isPercentage; }
	get budgetPercentage (): BudgetPercentageValueObject { return this.props.budgetPercentage; }
	get reasons (): Array<ReasonDomainEntity> { return this.props.reasons; }

	static create (props: BudgetBoxAggregateProps, id?: UniqueEntityID): Result<BudgetBoxAggregate> {
		if(!props.isPercentage && props.budgetPercentage.value<100)
			props.budgetPercentage = BudgetPercentageValueObject.create(100).getResult();
    
		return Result.ok<BudgetBoxAggregate>(new BudgetBoxAggregate(props, id));
	}
}