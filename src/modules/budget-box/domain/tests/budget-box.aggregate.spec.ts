import { CurrencyValueObject, DomainId } from 'types-ddd';
import { ReasonDomainEntity } from '@budget-box/domain/entity';
import { BudgetBoxAggregate } from '@budget-box/domain/aggregate';
import { BudgetDescriptionValueObject, BudgetPercentageValueObject, ReasonDescriptionValueObject} from '@budget-box/domain/value-object';
import { CURRENCY } from '@config/env';


describe('budget-box.aggregate', () => {
	it('should create a valid budget box', () => {
		const budgetBox = BudgetBoxAggregate.create({
			ID: DomainId.create(),
			ownerId: DomainId.create('valid_id'),
			description: BudgetDescriptionValueObject.create('budget description').getResult(),
			balanceAvailable: CurrencyValueObject.create({ value: 0, currency: CURRENCY }).getResult(),
			isPercentage: true,
			budgetPercentage: BudgetPercentageValueObject.create(87).getResult(),
			reasons: [
				ReasonDomainEntity.create({
					ID: DomainId.create(),
					description: ReasonDescriptionValueObject
						.create('reason description')
						.getResult()
				}).getResult()
			]
		});
		expect(budgetBox.isSuccess).toBe(true);
		expect(budgetBox.getResult().ownerId.uid).toBe('valid_id');
		expect(budgetBox.getResult().description.value).toBe('budget description');
		expect(budgetBox.getResult().balanceAvailable).toBe(0);
		expect(budgetBox.getResult().isPercentage).toBe(true);
		expect(budgetBox.getResult().budgetPercentage.value).toBe(87);
		expect(budgetBox.getResult().reasons[0].description.value).toBe('reason description');
	});
	it('should set budget percentage to 100% if not percentage', () => {
		const budgetBox = BudgetBoxAggregate.create({
			ID: DomainId.create(),
			ownerId: DomainId.create(),
			description: BudgetDescriptionValueObject.create('budget description').getResult(),
			balanceAvailable: CurrencyValueObject.create({ value: 0, currency: CURRENCY }).getResult(),
			isPercentage: false,
			budgetPercentage: BudgetPercentageValueObject.create(10).getResult(),
			reasons: [
				ReasonDomainEntity.create({
					ID: DomainId.create(),
					description: ReasonDescriptionValueObject
						.create('reason description')
						.getResult()
				}).getResult()
			]
		});
		expect(budgetBox.getResult().budgetPercentage.value).toBe(100);
	});
});
