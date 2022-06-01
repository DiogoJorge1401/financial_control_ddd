import { ValueObject, Result, DomainId } from 'types-ddd';
import { ERROR_MESSAGES } from '@shared/utils';

interface TransactionCalculation {
  budgetBoxId: DomainId
  monetaryValue: number
}

interface TransactionCalculationValueObjectProps {
  value: TransactionCalculation
}

export class TransactionCalculationValueObject extends ValueObject<TransactionCalculationValueObjectProps>{
	private constructor (props: TransactionCalculationValueObjectProps) {
		super(props);
	}

	get value () {
		return this.props.value;
	}

	static create (calculation: TransactionCalculation): Result<TransactionCalculationValueObject> {
		const isValidMonetaryValue = calculation.monetaryValue > 0;
		if(!isValidMonetaryValue)
			return Result.fail(ERROR_MESSAGES.TRANSACTION_INVALID_CALCULATION_MONETARY_AMOUNT);
		return Result.ok(new TransactionCalculationValueObject({
			value: calculation
		}));
	}
}