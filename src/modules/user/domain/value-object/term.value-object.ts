import { DateValueObject, Result, ValueObject } from 'types-ddd';
import { IpValueObject } from '@user/domain/value-object';


export interface IUserAgent {
	name: string,
	version: string,
	os: string,
	type: string
}

export interface TermValueObjectProps {
	ip: IpValueObject,
	acceptedAt: DateValueObject,
	userAgent: IUserAgent,
}

export class TermValueObject extends ValueObject<TermValueObjectProps>{
	private constructor (props: TermValueObjectProps) {
		super(props);
	}
	get value () {
		return this.props;
	}
	static create (props: TermValueObjectProps): Result<TermValueObject> {
		return Result.ok<TermValueObject>(new TermValueObject(props));
	}
}