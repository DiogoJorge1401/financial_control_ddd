import { BudgetPercentageValueObject } from './budgetPercentage.valueObject';

describe('budgetPercentage.valueObject', () => {
	it('should create a valid budget percentage', () => {
		const budgetPercentage = BudgetPercentageValueObject.create(55);
		expect(budgetPercentage.isSuccess).toBe(true);
		expect(budgetPercentage.getResult().value).toBe(55);
	});
	it('should fail create if budget percente is less than 0', () => {
		const budgetPercentage = BudgetPercentageValueObject.create(-1);
		expect(budgetPercentage.isFailure).toBe(true);
		expect(budgetPercentage.error).toBe('Invalid budget percentage, must be between 0 and 100');
	});
	it('should fail create if budget percente is greater than 100', () => {
		const budgetPercentage = BudgetPercentageValueObject.create(102);
		expect(budgetPercentage.isFailure).toBe(true);
		expect(budgetPercentage.error).toBe('Invalid budget percentage, must be between 0 and 100');
	});
});
