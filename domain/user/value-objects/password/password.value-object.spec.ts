import { ERROR_MESSAGES } from '@/domain/shared/common';
import { PasswordValueObject } from './password.value-object';
describe('password.value-object', () => {
	it('should create a valid password', () => {
		const password = PasswordValueObject.create('password1234');
		expect(password.isSuccess).toBe(true);
		expect(password.getResult().value).toBe('password1234');
		expect(password.getResult().isEncrypted).toBe(false);
	});
	it('should fail if password is not on range min 3 and max 20 chars ', () => {
		const passwordLessThan3 = PasswordValueObject.create('12');
		expect(passwordLessThan3.isFailure).toBe(true);
		expect(passwordLessThan3.error).toBe(ERROR_MESSAGES.USER_INVALID_PASSWORD_LENGTH);

		const passwordGreaterThan20 = PasswordValueObject.create('qwserfoiu1qwserfoiu11');
		expect(passwordGreaterThan20.isFailure).toBe(true);
		expect(passwordGreaterThan20.error).toBe(ERROR_MESSAGES.USER_INVALID_PASSWORD_LENGTH);
	});
	it('should create a valid encrypted password', async () => {
		const password = PasswordValueObject.create('password1234').getResult();
		expect(password.isEncrypted).toBe(false);
		await password.encryptPassword();
		expect(password.isEncrypted).toBe(true);
	});
});
