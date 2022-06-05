import { ValueObject, Result } from 'types-ddd';
import { ERROR_MESSAGES } from '@shared/utils';

interface BudgetPercentageValueObjectProps {
	value: number
}

export class BudgetPercentageValueObject extends ValueObject<BudgetPercentageValueObjectProps>{
	private constructor (props: BudgetPercentageValueObjectProps) {
		super(props);
	}

	get value () {
		return this.props.value;
	}
	static isTheValueValid (value:number):boolean{
		const isTheBudgetPercentageValid = value >= 0 && value <= 100;
		return isTheBudgetPercentageValid;
	}
	static create (budgetPercentage: number): Result<BudgetPercentageValueObject> {
		if (!this.isTheValueValid(budgetPercentage))
			return Result.fail(ERROR_MESSAGES.BUDGET_INVALID_PERCENTAGE_VALUE);
		return Result.ok(new BudgetPercentageValueObject({ value: budgetPercentage }));
	}
}