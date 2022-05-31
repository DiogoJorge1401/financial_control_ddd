import { Result, ValueObject } from '@shared/core';
import { DateValueObject, ERROR_MESSAGES } from '@shared/common';
import { IpValueObject } from '../ip/ip.value-object';

export enum IOs {
	LINUX = 'LINUX', 
	WINDOWS = 'WINDOWS',
	MACOS = 'MAC',
	IPHONE = 'IPHONE',
	APPLE = 'APPLE',
	MACINTOSH = 'MACINTOSH',
	ANDROID = 'ANDROID',
	IPAD = 'IPAD'
}

export interface IUserAgent {
	name: string,
	version: string,
	os: keyof typeof IOs,
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
		const isValidOS = Object.values(IOs)
			.includes(props.userAgent.os.toUpperCase() as any);
		if (!isValidOS)
			return Result.fail(ERROR_MESSAGES.USER_INVALID_TERM_AGENT_OS);
		return Result.ok<TermValueObject>(new TermValueObject(props));
	}
}