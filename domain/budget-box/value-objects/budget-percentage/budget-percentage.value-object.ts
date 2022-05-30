import { ValueObject,Result} from '@/domain/shared/core';
import { ERROR_MESSAGES } from '@/domain/shared/common';

interface BudgetPercentageValueObjectProps{
  value:number
}

export class BudgetPercentageValueObject extends ValueObject<BudgetPercentageValueObjectProps>{
	private constructor (props:BudgetPercentageValueObjectProps){
		super(props);
	}

	get value (){
		return this.props.value;
	}

	static create (budgetPercentage:number):Result<BudgetPercentageValueObject>{
		const isBudgetPercentageValid = budgetPercentage>=0&&budgetPercentage<=100;
		if(!isBudgetPercentageValid)
			return Result.fail(ERROR_MESSAGES.BUDGET_INVALID_PERCENTAGE_VALUE);
		return Result.ok(new BudgetPercentageValueObject({value:budgetPercentage}));
	}
}