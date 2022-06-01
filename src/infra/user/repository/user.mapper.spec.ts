import { UserAggregate } from '@domain/user/aggregates';
import { IpValueObject, PasswordValueObject, TermValueObject } from '@domain/user/value-objects';
import { DateValueObject, DomainId, EmailValueObject } from 'types-ddd';
import { Term, User } from '../entities/user.schema';
import { UserMapper } from './user.mapper';

describe('user.mapper', () => {
	const currentDate = new Date();
	const email = 'valid@mail.com';
	const id = 'valid_id';
	const password = 'validpassword345';
	const terms: Array<Term> = [
		{
			acceptedAt: currentDate,
			ip: '127.0.0.1',
			userAgent: {
				name: 'firefox',
				os: 'LINUX',
				type: 'browser',
				version: '80.0.1',
			}
		}
	];

	const domain: UserAggregate = UserAggregate.create({
		ID: DomainId.create(id),
		email: EmailValueObject.create(email).getResult(),
		password: PasswordValueObject.create(password).getResult(),
		terms: terms.map(({ acceptedAt, ip, userAgent }) => TermValueObject.create({
			acceptedAt: DateValueObject.create(acceptedAt).getResult(),
			ip: IpValueObject.create(ip).getResult(),
			userAgent
		}).getResult()),
		createdAt: currentDate,
		updatedAt: currentDate,
	}).getResult();


	const persistence: User = {
		email,
		id,
		password,
		terms,
		updatedAt: currentDate,
		createdAt: currentDate,
	};
  
	it('should be defined', () => {
		const mapper = new UserMapper();
		expect(mapper).toBeDefined();
	});
	it('should convert a persistence object to domain', () => {
		const mapper = new UserMapper();
		const result = mapper.map(persistence);
		expect(result.getResult()).toEqual(domain);
	});
});
