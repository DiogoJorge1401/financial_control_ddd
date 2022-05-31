import { DateValueObject, ERROR_MESSAGES } from '@shared/common';
import { IpValueObject } from '../ip/ip.value-object';
import { IUserAgent, TermValueObject } from './term.value-object';

interface IFakeUserAgent {
	name?: string,
	version?: string,
	os?: string,
	type?: string
}
interface MakeFakeProps {
	ipData?: string,
	acceptedAtData?: Date,
	userAgent: IFakeUserAgent,
}
interface MakeFakeResult {
	ip: IpValueObject,
	acceptedAt: DateValueObject,
	userAgent: IUserAgent,
}
const makeFakeTerm = ({
	acceptedAtData = new Date('2022-05-28T20:55:00'),
	ipData = '127.0.0.1',
	userAgent: {
		name = "firefox", os = 'LINUX', type = "browser", version = "86.0.0"
	}
}: MakeFakeProps): MakeFakeResult => {
	const ip = IpValueObject.create(ipData).getResult();
	const acceptedAt = DateValueObject.create(acceptedAtData).getResult();
	const userAgent = { name, version, os: os as any, type };
	return { acceptedAt, ip, userAgent };
};

describe('term.value-object', () => {
	it('should create a valid term', () => {
		const { acceptedAt, ip, userAgent } = makeFakeTerm({ userAgent: {} });
		const term = TermValueObject.create({ ip, acceptedAt: acceptedAt, userAgent });
		expect(term.isSuccess).toBe(true);
		expect(term.getResult().value).toEqual({ acceptedAt, ip, userAgent });
	});
	it('should fail if provide an invalid os', () => {
		const { acceptedAt, ip, userAgent } = makeFakeTerm(
			{ userAgent: { os: 'Blah', } }
		);
		const term = TermValueObject.create({ ip, acceptedAt: acceptedAt, userAgent });
		expect(term.isFailure).toBe(true);
		expect(term.error).toBe(ERROR_MESSAGES.USER_INVALID_TERM_AGENT_OS);
	});
});