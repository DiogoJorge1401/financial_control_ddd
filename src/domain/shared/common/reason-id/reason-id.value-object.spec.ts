import { UniqueEntityID } from '@shared/core';
import { ReasonIdValueObject } from './reason-id.value-object';

describe('reasonId.value-object', () => {
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