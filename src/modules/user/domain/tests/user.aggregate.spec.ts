import { IpValueObject, TermValueObject } from '@user/domain/value-object';
import { DateValueObject, DomainId, EmailValueObject, PasswordValueObject } from 'types-ddd';
import { UserAggregate } from '@user/domain/aggregate';
;

describe('user.aggregate', () => {
	it('should create a valid user', () => {
		const user = UserAggregate.create({
			ID: DomainId.create(),
			email: EmailValueObject.create('valid_mail@domain.com').getResult(),
			password: PasswordValueObject.create('valid_password').getResult(),
			terms: [
				TermValueObject.create({
					acceptedAt: DateValueObject.create(new Date()).getResult(),
					ip: IpValueObject.create('45.192.110.42').getResult(),
					userAgent: {
						name: 'firefox',
						os: 'LINUX',
						type: 'browser',
						version: '80.0.1',
					},
				}).getResult(),
			]
		});
		expect(user.isSuccess).toBe(true);
	});
	it('should be able get valid values', () => {
		const user = UserAggregate.create({
			ID: DomainId.create(),
			email: EmailValueObject.create('valid_mail@domain.com').getResult(),
			password: PasswordValueObject.create('valid_password').getResult(),
			terms: [
				TermValueObject.create({
					acceptedAt: DateValueObject.create(new Date()).getResult(),
					ip: IpValueObject.create('45.192.110.42').getResult(),
					userAgent: {
						name: 'firefox',
						os: 'LINUX',
						type: 'browser',
						version: '80.0.1',
					},
				}).getResult(),
			]
		}).getResult();
		expect(user.email.value).toBe('valid_mail@domain.com');
		expect(user.password.value).toBe('valid_password');
		expect(user.terms[0].ip.value).toBe('45.192.110.42');
		expect(user.terms[0].userAgent).toEqual({
			name: 'firefox',
			os: 'LINUX',
			type: 'browser',
			version: '80.0.1',
		});
	});
	it('should create a valid user with provided id', () => {
		const ID = DomainId.create();
		const user = UserAggregate.create({
			ID,
			email: EmailValueObject.create('valid_mail@domain.com').getResult(),
			password: PasswordValueObject.create('valid_password').getResult(),
			terms: [
				TermValueObject.create({
					acceptedAt: DateValueObject.create(new Date()).getResult(),
					ip: IpValueObject.create('45.192.110.42').getResult(),
					userAgent: {
						name: 'firefox',
						os: 'LINUX',
						type: 'browser',
						version: '80.0.1',
					},
				}).getResult(),
			]
		});
		expect(user.isSuccess).toBe(true);
		expect(user.getResult().id.toValue()).toBe(ID.toValue());
	});
});