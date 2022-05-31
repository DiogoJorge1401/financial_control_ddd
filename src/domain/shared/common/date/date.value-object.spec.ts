import { ERROR_MESSAGES } from '../error-messages';
import { DateValueObject } from './date.value-object';


describe('date.value-object', () => {
	it('should create a valid date', () => {
		const date = DateValueObject.create(new Date('2022-05-28 20:55:00'));
		expect(date.isSuccess).toBe(true);
		expect(date.getResult().value).toBe('2022-05-28 20:55:00');
	});
	it('should fail if provide an invalid date', () => {
		const date = DateValueObject.create('2022-05-2720:55:00' as any);
		expect(date.isFailure).toBe(true);
		expect(date.error).toBe(ERROR_MESSAGES.DATE_INVALID_FORMAT);
	});
});
