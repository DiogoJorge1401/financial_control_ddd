import { UniqueEntityID } from '@shared/core';
import { BudgetIdValueObject } from './budget-id.value-object';

describe('budgetId.value-object', () => {
	it('should create a valid budget id', () => {
		const budgetId = BudgetIdValueObject.create();
		expect(budgetId.isSuccess).toBe(true);
	});
	it('should create a valid budget id with provided value', () => {
		const budgetId = BudgetIdValueObject.create(new UniqueEntityID('valid_id'));
		expect(budgetId.isSuccess).toBe(true);
		expect(budgetId.getResult().id.toValue()).toBe('valid_id');
	});
});