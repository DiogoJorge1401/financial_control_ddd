import { EmailValueObject, IpValueObject, PasswordValueObject, TermValueObject } from '@domain/user/value-objects';
import { DateValueObject, DomainId } from 'types-ddd';
import { UserAggregate } from './user.aggregate';
;

describe('user.aggregate', () => {
	it('should create a valid user', () => {
		const budgetBoxIds = [
			DomainId.create(),
			DomainId.create()
		];
		const user = UserAggregate.create({
			ID: DomainId.create(),
			email: EmailValueObject.create('valid_mail@domain.com').getResult(),
			password: PasswordValueObject.create('valid_password').getResult(),
			totalBalanceAvailable: 0,
			budgetBoxIds,
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
		const budgetBoxIds = [
			DomainId.create('valid-id-1'),
			DomainId.create('valid-id-2')
		];
		const user = UserAggregate.create({
			ID: DomainId.create(),
			email: EmailValueObject.create('valid_mail@domain.com').getResult(),
			password: PasswordValueObject.create('valid_password').getResult(),
			totalBalanceAvailable: 0,
			budgetBoxIds,
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
		expect(user.totalBalanceAvailable).toBe(0);
		expect(user.budgetBoxIds.map(el => el.toValue())).toEqual(['valid-id-1', 'valid-id-2']);
		expect(user.terms[0].value.ip.value).toBe('45.192.110.42');
		expect(user.terms[0].value.userAgent).toEqual({
			name: 'firefox',
			os: 'LINUX',
			type: 'browser',
			version: '80.0.1',
		});
	});
	it('should returs an empty array if not provide budgetBoxIds', () => {
		const user = UserAggregate.create({
			ID: DomainId.create(),
			email: EmailValueObject.create('valid_mail@domain.com').getResult(),
			password: PasswordValueObject.create('valid_password').getResult(),
			totalBalanceAvailable: 0,
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
		expect(user.getResult().budgetBoxIds).toEqual([]);
	});
	it('should create a valid user with provided id', () => {
		const ID = DomainId.create();
		const budgetBoxIds = [
			DomainId.create(),
			DomainId.create()
		];
		const user = UserAggregate.create({
			ID,
			email: EmailValueObject.create('valid_mail@domain.com').getResult(),
			password: PasswordValueObject.create('valid_password').getResult(),
			totalBalanceAvailable: 0,
			budgetBoxIds,
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