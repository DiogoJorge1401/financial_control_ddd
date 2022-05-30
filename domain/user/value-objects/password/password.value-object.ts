import { Result, ValueObject } from '@/domain/shared/core';
import { compare, hash } from 'bcrypt';

interface PasswordValueObjectProps {
	value: string
}

export class PasswordValueObject extends ValueObject<PasswordValueObjectProps>{
	private _isEncrypted: boolean

	private constructor(props: PasswordValueObjectProps) {
		super(props);
		this._isEncrypted = false
	}

	get value(): string { return this.props.value; }

	get isEncrypted(): boolean { return this._isEncrypted }

	async encryptPassword(): Promise<void> {
		const salt = 10
		this.props.value = await hash(this.value, salt);
		this._isEncrypted = true
	}

	async compare(candidate: string): Promise<boolean> {
		if (!this.isEncrypted)
			return candidate === this.value
		return await compare(candidate, this.value)
	}

	static create(password: string): Result<PasswordValueObject> {
		const isValidPasswordLength = password.length >= 3 && password.length <= 20;
		if (!isValidPasswordLength)
			return Result.fail('Password must have minimum 3 and max 20 characters');
		return Result.ok<PasswordValueObject>(new PasswordValueObject({ value: password }));
	}
}