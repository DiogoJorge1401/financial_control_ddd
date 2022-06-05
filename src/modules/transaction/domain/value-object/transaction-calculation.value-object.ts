import { ValueObject, Result, DomainId, CurrencyValueObject } from 'types-ddd';
import { ERROR_MESSAGES } from '@shared/utils';

interface TransactionCalculation {
  budgetBoxId: DomainId
  currency: CurrencyValueObject
}

interface TransactionCalculationValueObjectProps {
  value: TransactionCalculation
}

export class TransactionCalculationValueObject extends ValueObject<TransactionCalculationValueObjectProps>{
	private constructor (props: TransactionCalculationValueObjectProps) {
		super(props);
	}

	get calculation () {
		return this.props.value;
	}
	static isTheValueValid (value:number):boolean{
		const isTheMonetaryValueValid = value > 0;
		return isTheMonetaryValueValid;
	}
	static create (calculation: TransactionCalculation): Result<TransactionCalculationValueObject> {
		if(!this.isTheValueValid(calculation.currency.value))
			return Result.fail(ERROR_MESSAGES.TRANSACTION_INVALID_CALCULATION_MONETARY_AMOUNT);
		return Result.ok(new TransactionCalculationValueObject({
			value: calculation
		}));
	}
}