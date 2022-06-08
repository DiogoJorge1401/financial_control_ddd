import { DateValueObject, Result, ValueObject } from 'types-ddd';
import { IpValueObject } from '@user/domain/value-object';


export interface IUserAgent {
	name: string,
	version: string,
	os: string,
	type: string
}

export interface TermValueObjectProps {
	ip: IpValueObject
	isAccepted: boolean
	acceptedAt: DateValueObject
	userAgent: IUserAgent
}

export class TermValueObject extends ValueObject<TermValueObjectProps>{
	private constructor (props: TermValueObjectProps) {
		super(props);
	}
	get ip (): IpValueObject {
		return this.props.ip;
	}
	get acceptedAt (): DateValueObject {
		return this.props.acceptedAt;
	}
	get userAgent (): IUserAgent {
		return this.props.userAgent;
	}
	static create (props: TermValueObjectProps): Result<TermValueObject> {
		if (!props.isAccepted)
			return Result.fail('Terms must be accepted');
		return Result.ok<TermValueObject>(new TermValueObject(props));
	}
}