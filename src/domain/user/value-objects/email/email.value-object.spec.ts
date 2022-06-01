import { ERROR_MESSAGES } from '@shared/utils';
import { EmailValueObject } from './email.value-object';

describe('email.value-object', () => {
	it('should return a valid email', () => {
		const email = EmailValueObject.create("validemail@mail.com");
		expect(email.isSuccess).toBe(true);
	});
	it('should return fail if provide an invalid email', () => {
		const email = EmailValueObject.create("validEmail");

		expect(email.error).toBe(ERROR_MESSAGES.USER_INVALID_EMAIL_FORMAT);
		expect(email.isFailure).toBe(true);
	});

	it('should normalize email to lowercase', () => {
		const email = EmailValueObject.create("VALID_EMAIL@mail.com");
		expect(email.getResult().value).toBe("valid_email@mail.com");
	});
});
