import { AcceptedAtValueObject, EmailValueObject, IpValueObject, PasswordValueObject, TermValueObject } from '@/domain/user/valueObjects';
import { UniqueEntityID } from '../../../shared';
import { UserAggregate } from './user.aggregate';

describe('user.aggregate', () => {
	it('should create a valid user', () => {
		const user = UserAggregate.create({
			email: EmailValueObject.create('valid_mail@domain.com').getResult(),
			password: PasswordValueObject.create('valid_password').getResult(),
			totalBalanceAvailable: 0,
			budgetBoxIds:['valid_id_1','valid_id_2'],
			terms: [
				TermValueObject.create({
					acceptedAt: AcceptedAtValueObject.create(new Date()).getResult(),
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
			email: EmailValueObject.create('valid_mail@domain.com').getResult(),
			password: PasswordValueObject.create('valid_password').getResult(),
			totalBalanceAvailable: 0,
			budgetBoxIds:['valid_id_1','valid_id_2'],
			terms: [
				TermValueObject.create({
					acceptedAt: AcceptedAtValueObject.create(new Date()).getResult(),
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
		expect(user.budgetBoxIds).toEqual(['valid_id_1','valid_id_2']);
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
			email: EmailValueObject.create('valid_mail@domain.com').getResult(),
			password: PasswordValueObject.create('valid_password').getResult(),
			totalBalanceAvailable: 0,
			terms: [
				TermValueObject.create({
					acceptedAt: AcceptedAtValueObject.create(new Date()).getResult(),
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
		const user = UserAggregate.create({
			email: EmailValueObject.create('valid_mail@domain.com').getResult(),
			password: PasswordValueObject.create('valid_password').getResult(),
			totalBalanceAvailable: 0,
			budgetBoxIds:['valid_id_1','valid_id_2'],
			terms: [
				TermValueObject.create({
					acceptedAt: AcceptedAtValueObject.create(new Date()).getResult(),
					ip: IpValueObject.create('45.192.110.42').getResult(),
					userAgent: {
						name: 'firefox',
						os: 'LINUX',
						type: 'browser',
						version: '80.0.1',
					},
				}).getResult(),
			]
		},new UniqueEntityID('valid_id'));
		expect(user.isSuccess).toBe(true);
		expect(user.getResult().id.toValue()).toBe('valid_id');
	});
});