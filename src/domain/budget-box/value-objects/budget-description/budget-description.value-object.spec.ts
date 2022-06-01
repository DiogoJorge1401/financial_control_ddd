import { ERROR_MESSAGES } from '@shared/utils';
import { BudgetDescriptionValueObject } from './budget-description.value-object';

describe('budgetDescription.value-object', () => {
	it('should create a valid budgetDescription value object', () => {
		const budgetDescription = BudgetDescriptionValueObject.create('valid budgetDescription');
		expect(budgetDescription.isSuccess).toBe(true);
		expect(budgetDescription.getResult().value).toBe('valid budgetdescription');
	});
	it('should normalize budgetDescription to lowercase', () => {
		const budgetDescription = BudgetDescriptionValueObject.create('VALID BUDGETDESCRIPTION');
		expect(budgetDescription.isSuccess).toBe(true);
		expect(budgetDescription.getResult().value).toBe('valid budgetdescription');
	});
	it('should fail creation if value length is less than 1',()=>{
		const budgetDescription = BudgetDescriptionValueObject.create(' ');
		expect(budgetDescription.isFailure).toBe(true);
		expect(budgetDescription.error).toBe(ERROR_MESSAGES.BUDGET_INVALID_DESCRIPTION_LENGTH);
	});
	it('should fail creation if value length is greater than 30',()=>{
    	const budgetDescription = BudgetDescriptionValueObject.create(
			`
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      `
		);
		expect(budgetDescription.isFailure).toBe(true);
		expect(budgetDescription.error).toBe(ERROR_MESSAGES.BUDGET_INVALID_DESCRIPTION_LENGTH);
	});
});
