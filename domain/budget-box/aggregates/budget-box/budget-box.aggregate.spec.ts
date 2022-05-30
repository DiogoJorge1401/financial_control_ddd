import { UserIdValueObject } from '@/domain/shared/common';
import { ReasonDomainEntity } from '../../entities';
import { BudgetDescriptionValueObject, BudgetPercentageValueObject, ReasonDescriptionValueObject } from '../../value-objects';
import { BudgetBoxAggregate } from './budget-box.aggregate';


describe('budget-box.aggregate', () => {
	it('should create a valid budget box', () => {
		const budgetBox = BudgetBoxAggregate.create({
			ownerId:UserIdValueObject.create().getResult(),
			description:BudgetDescriptionValueObject.create('budget description').getResult(),
			balanceAvailable:0,
			isPercentage:true,
			budgetPercentage:BudgetPercentageValueObject.create(87).getResult(),
			reasons:[
				ReasonDomainEntity.create(ReasonDescriptionValueObject.create('reason description').getResult()).getResult()
			]
		});
		expect(budgetBox.isSuccess).toBe(true);
		expect(budgetBox.getResult().budgetPercentage.value).toBe(87);
	});
	it('should set budget percentage to 100% if not percentage', () => {
		const budgetBox = BudgetBoxAggregate.create({
			ownerId:UserIdValueObject.create().getResult(),
			description:BudgetDescriptionValueObject.create('budget description').getResult(),
			balanceAvailable:0,
			isPercentage:false,
			budgetPercentage:BudgetPercentageValueObject.create(10).getResult(),
			reasons:[
				ReasonDomainEntity.create(ReasonDescriptionValueObject.create('reason description').getResult()).getResult()
			]
		});
		expect(budgetBox.getResult().budgetPercentage.value).toBe(100);
	});
});
