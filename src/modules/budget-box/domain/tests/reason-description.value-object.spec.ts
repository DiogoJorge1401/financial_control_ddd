import { ERROR_MESSAGES } from '@shared/utils';
import { ReasonDescriptionValueObject } from '@budget-box/domain/value-object';

describe('reasonDescription.value-object', () => {
	it('should create a valid reasonDescription value object', () => {
		const reasonDescription = ReasonDescriptionValueObject.create('reasonDescription');
		expect(reasonDescription.isSuccess).toBe(true);
		expect(reasonDescription.getResult().value).toBe('reasondescription');
	});
	it('should normalize reasonDescription to lowercase', () => {
		const reasonDescription = ReasonDescriptionValueObject.create('REASONDESCRIPTION');
		expect(reasonDescription.isSuccess).toBe(true);
		expect(reasonDescription.getResult().value).toBe('reasondescription');
	});
	it('should fail creation if value length is less than 1',()=>{
		const reasonDescription = ReasonDescriptionValueObject.create(' ');
		expect(reasonDescription.isFailure).toBe(true);
		expect(reasonDescription.error).toBe(ERROR_MESSAGES.BUDGET_INVALID_REASON_DESCRIPTION_LENGTH);
	});
	it('should fail creation if value length is greater than 20',()=>{
    	const reasonDescription = ReasonDescriptionValueObject.create(
			`
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      `
		);
		expect(reasonDescription.isFailure).toBe(true);
		expect(reasonDescription.error).toBe(ERROR_MESSAGES.BUDGET_INVALID_REASON_DESCRIPTION_LENGTH);
	});
});
