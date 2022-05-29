import { UniqueEntityID } from '@/domain/shared/';
import { ReasonIdValueObject } from './reason-id.valueObject';

describe('reasonId.valueObject', () => {
	it('should create a valid budget id', () => {
		const reasonId = ReasonIdValueObject.create();
		expect(reasonId.isSuccess).toBe(true);
	});
	it('should create a valid budget id with provided value', () => {
		const reasonId = ReasonIdValueObject.create(new UniqueEntityID('valid_id'));
		expect(reasonId.isSuccess).toBe(true);
		expect(reasonId.getResult().id.toValue()).toBe('valid_id');
	});
});