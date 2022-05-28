import { Result, ValueObject } from 'types-ddd';
import isIP from 'validator/lib/isIP';

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
			return Result.fail('Invalid IP');
		return Result.ok(new IpValueObject({ value: ip }));
	}
}