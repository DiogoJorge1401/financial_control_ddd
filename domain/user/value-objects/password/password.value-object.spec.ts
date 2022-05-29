import { PasswordValueObject } from './password.value-object';

describe('password.value-object', () => {
	it('should create a valid password', () => {
		const password = PasswordValueObject.create('password1234');
		expect(password.isSuccess).toBe(true);
		expect(password.getResult().value).toBe('password1234');
	});
	it('should fail if password is not on range min 3 and max 20 chars ', () => {
		const message = 'Password must have minimum 3 and max 20 characters';
		const passwordLessThan3 = PasswordValueObject.create('12');
		expect(passwordLessThan3.isFailure).toBe(true);
		expect(passwordLessThan3.error).toBe(message);

		const passwordGreaterThan20 = PasswordValueObject.create('qwserfoiu1qwserfoiu11');
		expect(passwordGreaterThan20.isFailure).toBe(true);
		expect(passwordGreaterThan20.error).toBe(message);
	});
});
