import { ValueObject,Result} from '@/domain/shared/core';

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
			return Result.fail('Invalid budget percentage, must be between 0 and 100');
		return Result.ok(new BudgetPercentageValueObject({value:budgetPercentage}));
	}
}