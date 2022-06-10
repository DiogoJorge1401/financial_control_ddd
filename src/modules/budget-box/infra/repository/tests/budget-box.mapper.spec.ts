import { BudgetBoxMock } from '@budget-box/domain/tests/mock';
import { BudgetBoxReasonMapperToDomain, BudgetBoxMapperToDomain } from '@budget-box/infra/repository';

describe('budget-box.mapper', () => {
	const budgetBoxMapperToDomain = new BudgetBoxMapperToDomain(new BudgetBoxReasonMapperToDomain());
	const mock = new BudgetBoxMock();

	it('should fail if provide an invalid budget percentage', () => {
		const invalidPercentage = 150;
		const model = mock.model({ budgetPercentage: invalidPercentage });
		const result = budgetBoxMapperToDomain.map(model);

		expect(result.isFailure).toBe(true);
		expect(result.statusCodeNumber).toBe(422);
	});
	it('should creatte a valid budget box aggregate', () => {
		const model = mock.model();
		const aggregate = mock.domain(model);
		const result = budgetBoxMapperToDomain.map(model);
    
		expect(result.isSuccess).toBeTruthy();
		expect(result.statusCodeNumber).toBe(200);
		expect(result.getResult()).toEqual(aggregate.getResult());
	});
});
