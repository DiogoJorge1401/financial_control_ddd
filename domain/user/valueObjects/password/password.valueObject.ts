import { Result, ValueObject } from '../../../shared';

interface PasswordValueObjectProps {
  value: string
}

export class PasswordValueObject extends ValueObject<PasswordValueObjectProps>{
	private constructor (props: PasswordValueObjectProps) {
		super(props);
	}

	get value (): string {
		return this.props.value;
	}

	static create (password: string): Result<PasswordValueObject> {
		const isValidPasswordLength = password.length >= 3 && password.length <= 20;
		if (!isValidPasswordLength)
			return Result.fail('Password must have minimum 3 and max 20 characters');

		return Result.ok<PasswordValueObject>(new PasswordValueObject({ value: password }));
	}
}