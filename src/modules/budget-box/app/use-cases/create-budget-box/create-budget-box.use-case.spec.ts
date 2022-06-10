import { BudgetBoxMock } from '@budget-box/domain/tests/mock';
import { IBudgetBoxRepository } from '@budget-box/domain/interfaces';
import { CreateBudgetBoxUseCase } from '.';

describe('create-budget-box.use-case', () => {
	const budgetBoxMock = new BudgetBoxMock();
	const mockRepo: IBudgetBoxRepository = {
		delete: jest.fn(),
		exists: jest.fn(),
		find: jest.fn(),
		findOne: jest.fn(),
		save: jest.fn(),
	};
	const useCase = new CreateBudgetBoxUseCase(mockRepo);

	it('should successfully create a budget box', async () => {

		const {
			ownerId,
			budgetPercentage,
			description,
			isPercentage
		} = budgetBoxMock.model();

		const result = await useCase.execute({
			ownerId,
			budgetPercentage,
			description,
			isPercentage,
		});

		expect(result.isSuccess).toBeTruthy();
	});

	it('should successfully call budget box repository', async () => {
		const repoSpy = jest.spyOn(mockRepo, 'save');
		const {
			ownerId,
			budgetPercentage,
			description,
			isPercentage
		} = budgetBoxMock.model();

		const result = await useCase.execute({
			ownerId,
			budgetPercentage,
			description,
			isPercentage,
		});
		expect(result.isSuccess).toBeTruthy();
		expect(repoSpy).toBeCalled();
	});

	it('should fail if provide a percentage greater than 100', async () => {
		const invalidPercentage = 110;
		const {
			ownerId,
			budgetPercentage,
			description,
			isPercentage
		} = budgetBoxMock.model({ budgetPercentage: invalidPercentage });

		const result = await useCase.execute({
			ownerId,
			budgetPercentage,
			description,
			isPercentage,
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.statusCode).toBe('UNPROCESSABLE_ENTITY');
	});
});
