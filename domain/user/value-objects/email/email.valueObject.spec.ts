import { EmailValueObject } from './email.valueObject';

describe('email.valueObject', () => {
	it('should return a valid email', () => {
		const email = EmailValueObject.create("validemail@mail.com");

		expect(email.isSuccess).toBe(true);
		expect(email.isFailure).toBe(false);
	});
	it('should return fail if provide an invalid email', () => {
		const email = EmailValueObject.create("validEmail");

		expect(email.error).toBe("Invalid Email");
		expect(email.isFailure).toBe(true);
	});

	it('should normalize email to lowercase', () => {
		const email = EmailValueObject.create("VALID_EMAIL@mail.com");
		expect(email.getResult().value).toBe("valid_email@mail.com");
	});
});
