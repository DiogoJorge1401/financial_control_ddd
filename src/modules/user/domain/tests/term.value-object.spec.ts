import { DateValueObject } from 'types-ddd';
import { IpValueObject } from '@user/domain/value-object';
import { IUserAgent, TermValueObject } from '@user/domain/value-object';

interface IFakeUserAgent {
	name?: string
	version?: string
	os?: string
	type?: string
}
interface MakeFakeProps {
	ipData?: string
	acceptedAtData?: Date
	userAgent: IFakeUserAgent
}
interface MakeFakeResult {
	ip: IpValueObject
	acceptedAt: DateValueObject
	userAgent: IUserAgent
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
		const result = term.getResult();
		expect(result.acceptedAt).toEqual( acceptedAt);
		expect(result.ip).toEqual(ip);
		expect(result.userAgent).toEqual(userAgent);
	});
});
