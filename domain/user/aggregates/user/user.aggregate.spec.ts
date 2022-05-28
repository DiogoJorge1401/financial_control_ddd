import { AcceptedAtValueObject, EmailValueObject, IpValueObject, PasswordValueObject, TermValueObject } from '@/domain/user/valueObjects';
import { UserAggregate } from './user.aggregate';

describe('user.aggregate', () => {
	it('should create a valid user', () => {
		const user = UserAggregate.create({
			email: EmailValueObject.create('valid_mail@domain.com').getResult(),
			password: PasswordValueObject.create('valid_password').getResult(),
			totalBalanceAvailable:0,
			terms: TermValueObject.create({
				acceptedAt: AcceptedAtValueObject.create(new Date()).getResult(),
				ip: IpValueObject.create('45.192.110.42').getResult(),
				userAgent: {
					name: 'firefox',
					os: 'LINUX',
					type: 'browser',
					version: '80.0.1',
				},
			}).getResult(),
		});
		expect(user.isSuccess).toBe(true);
	});
});