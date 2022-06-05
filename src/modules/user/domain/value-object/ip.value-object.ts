import { Result, ValueObject } from 'types-ddd';
import isIP from 'validator/lib/isIP';
import { ERROR_MESSAGES } from '@shared/utils';

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
	static isTheValueValid (value:string):boolean{
		const isTheIpValid = isIP(value);
		return isTheIpValid;
	}
	static create (ip: string): Result<IpValueObject> {
		if (!this.isTheValueValid(ip))
			return Result.fail(ERROR_MESSAGES.USER_INVALID_TERM_IP_FORMAT);
		return Result.ok(new IpValueObject({ value: ip }));
	}
}