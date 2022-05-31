import { BudgetIdValueObject, ERROR_MESSAGES } from '@shared/common';
import { UniqueEntityID } from '@shared/core';
import { TransactionCalculationValueObject } from './transaction-calculation.value-object';

describe('transaction-calculation.value-object', () => {
	it('should create a valid transaction calculation', () => {
		const budgetBoxId = BudgetIdValueObject
			.create(new UniqueEntityID('valid_id'))
			.getResult();
		const value = 50;
		const calculation = TransactionCalculationValueObject.create(
			{
				budgetBoxId,
				'monetaryValue': value
			}
		);

		expect(calculation.isSuccess).toBe(true);
		expect(
			calculation
				.getResult()
				.value
				.budgetBoxId
				.id
				.toValue()
		)
			.toEqual('valid_id');
		expect(calculation.getResult().value.monetaryValue).toBe(50);
	});
	it('should fail if provide a monetary value less than or equal 0', () => {
		const budgetBoxId = BudgetIdValueObject
			.create(new UniqueEntityID('valid_id'))
			.getResult();
		const value = 0;
		const calculation = TransactionCalculationValueObject.create(
			{
				budgetBoxId,
				'monetaryValue': value
			}
		);

		expect(calculation.isFailure).toBe(true);
		expect(calculation.error).toEqual(ERROR_MESSAGES.TRANSACTION_INVALID_CALCULATION_MONETARY_AMOUNT);
	});
});