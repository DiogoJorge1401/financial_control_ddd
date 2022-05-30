import { Result, ValueObject } from '@/domain/shared/core';
import isIP from 'validator/lib/isIP';
import { ERROR_MESSAGES } from '@/domain/shared/common';

interface IpValueObjectProps {
	value: string
}

export class IpValueObject extends ValueObject<IpValueObjectProps>{
	private constructor (props: IpValueObjectProps) {
		super(props);
	}

	get value () {
		return this.props.value;
	}

	static create (ip: string): Result<IpValueObject> {
		const isValidIP = isIP(ip);
		if (!isValidIP)
			return Result.fail(ERROR_MESSAGES.USER_INVALID_TERM_IP_FORMAT);
		return Result.ok(new IpValueObject({ value: ip }));
	}
}