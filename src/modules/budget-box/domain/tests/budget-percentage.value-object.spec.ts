import { ERROR_MESSAGES } from '@shared/utils';
import { BudgetPercentageValueObject } from '@budget-box/domain/value-object';

describe('budgetPercentage.value-object', () => {
	it('should create a valid budget percentage', () => {
		const budgetPercentage = BudgetPercentageValueObject.create(55);
		expect(budgetPercentage.isSuccess).toBe(true);
		expect(budgetPercentage.getResult().value).toBe(55);
	});
	it('should fail create if budget percente is less than 0', () => {
		const budgetPercentage = BudgetPercentageValueObject.create(-1);
		expect(budgetPercentage.isFailure).toBe(true);
		expect(budgetPercentage.error).toBe(ERROR_MESSAGES.BUDGET_INVALID_PERCENTAGE_VALUE);
	});
	it('should fail create if budget percente is greater than 100', () => {
		const budgetPercentage = BudgetPercentageValueObject.create(102);
		expect(budgetPercentage.isFailure).toBe(true);
		expect(budgetPercentage.error).toBe(ERROR_MESSAGES.BUDGET_INVALID_PERCENTAGE_VALUE);
	});
});
