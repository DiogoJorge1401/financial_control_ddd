import { BudgetBoxMock } from './mock/budget-box.mock';
import { ReasonMock } from './mock/reason.mock';


describe('budget-box.aggregate', () => {

	const reasonMock = new ReasonMock();
	const budgetBoxMock = new BudgetBoxMock()

	it('should create a valid budget box', () => {
		const budgetBox = budgetBoxMock.domain({
			budgetPercentage: 20,
			isPercentage: false
		});
		expect(budgetBox.isSuccess).toBe(true);
		expect(budgetBox.getResult().ownerId.uid).toBe('valid_owner_id');
		expect(budgetBox.getResult().description.value).toBe('valid_description');
		expect(budgetBox.getResult().balanceAvailable).toBe(100);
		expect(budgetBox.getResult().isPercentage).toBe(false);
		expect(budgetBox.getResult().budgetPercentage.value).toBe(100);
		expect(budgetBox.getResult().reasons[0].description.value).toBe('valid_description');
	});
	it('should set budget percentage to 100% if not percentage', () => {
		const budgetBox = budgetBoxMock.domain({
			budgetPercentage: 70,
			isPercentage: true,
			reasons: [reasonMock.model({ id: 'valid_id' })]
		});
		expect(budgetBox.getResult().budgetPercentage.value).toBe(70);
	});
});
