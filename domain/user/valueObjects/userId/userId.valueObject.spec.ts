import { UniqueEntityID } from 'types-ddd';
import { UserIdValueObject } from './userId.valueObject';

describe('userId.valueObject', () => {
	it('should create a valid userId', () => {
		const userId = UserIdValueObject.create();
		expect(userId.isSuccess).toBe(true);
	});
	it('should create a valid userId with provided value', () => {
		const userId = UserIdValueObject.create(new UniqueEntityID('valid_id'));
		expect(userId.isSuccess).toBe(true);
		expect(userId.getResult().id.toValue()).toBe('valid_id');
	});
});
