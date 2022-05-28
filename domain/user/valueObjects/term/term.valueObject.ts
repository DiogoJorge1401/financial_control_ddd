import { Result, ValueObject } from 'types-ddd';
import { AcceptedAtValueObject } from '../acceptedAt/acceptedAt.valueObject';
import { IpValueObject } from '../ip/ip.valueObject';

export enum IOs{
  LINUX='LINUX',WINDOWS='WINDOWS',MACOS='MACOS'
}

export interface IUserAgent {
  name: string,
  version: string,
  os:  keyof typeof IOs,
  type: string
}

export interface TermValueObjectProps {
  ip: IpValueObject,
  acceptedAt: AcceptedAtValueObject,
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
		const isValidOS = Object.values(IOs).includes(props.userAgent.os.toUpperCase() as any);
		if(!isValidOS)
			return Result.fail('Invalid Os');
		return Result.ok<TermValueObject>(new TermValueObject(props));
	}
}