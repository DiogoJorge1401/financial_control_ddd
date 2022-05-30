import { Result, ValueObject } from '@/domain/shared/core';
import isEmail from 'validator/lib/isEmail';
import { ERROR_MESSAGES } from '@/domain/shared/common';
export interface EmailValueObjectProps {
	value: string
}

export class EmailValueObject extends ValueObject<EmailValueObjectProps>{
	private constructor (props: EmailValueObjectProps) { super(props); }

	get value (): string {
		return this.props.value;
	}

	static create (email: string): Result<EmailValueObject> {
		const isValidEmail = isEmail(email);
		if (!isValidEmail)
			return Result.fail<EmailValueObject>(ERROR_MESSAGES.USER_INVALID_EMAIL_FORMAT);

		return Result.ok<EmailValueObject>(new EmailValueObject({ value: email.toLowerCase() }));
	}
}