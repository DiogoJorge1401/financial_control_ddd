import { ERROR_MESSAGES } from '@shared/utils';
import { CurrencyValueObject, DomainId } from 'types-ddd';
import { CURRENCY } from '@config/env';
import { TransactionCalculationValueObject } from '@transaction/domain/value-object';

describe('transaction-calculation.value-object', () => {
	it('should create a valid transaction calculation', () => {
		const budgetBoxId = DomainId.create('valid_id');
		const value = CurrencyValueObject.create(
			{ value: 50, currency: CURRENCY }
		).getResult();
		const calculation = TransactionCalculationValueObject.create(
			{
				budgetBoxId,
				'currency': value
			}
		);

		expect(calculation.isSuccess).toBe(true);
		expect(
			calculation
				.getResult()
				.calculation
				.budgetBoxId
				.toValue()
		)
			.toEqual('valid_id');
		expect(calculation.getResult().calculation.currency.value).toBe(50);
	});
	it('should fail if provide a currency value less than or equal 0', () => {
		const budgetBoxId = DomainId.create('valid_id');
		const value = CurrencyValueObject.create(
			{ value: 0, currency: CURRENCY }
		).getResult();
		const calculation = TransactionCalculationValueObject.create(
			{
				budgetBoxId,
				'currency': value
			}
		);

		expect(calculation.isFailure).toBe(true);
		expect(calculation.error).toEqual(ERROR_MESSAGES.TRANSACTION_INVALID_CALCULATION_MONETARY_AMOUNT);
	});
});
