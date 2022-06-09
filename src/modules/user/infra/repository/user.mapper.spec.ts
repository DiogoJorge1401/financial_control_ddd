import { UserAggregate } from '@user/domain/aggregate';
import { IpValueObject, TermValueObject } from '@user/domain/value-object';
import { DateValueObject, DomainId, EmailValueObject, PasswordValueObject } from 'types-ddd';
import { ITerm } from '@shared/interfaces/user-model-interface';
import { UserMapper } from '.';
import { IUser } from '@shared/interfaces/user-model-interface';

describe('user.mapper', () => {
	const currentDate = new Date('2022-01-01');
	const email = 'valid@mail.com';
	const id = 'valid_id';
	const password = 'validpassword345';
	const terms: Array<ITerm> = [
		{
			acceptedAt: currentDate,
			ip: '127.0.0.1',
			isAccepted: true,
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
			isAccepted: true,
			ip: IpValueObject.create(ip).getResult(),
			userAgent
		}).getResult()),
		createdAt: currentDate,
		updatedAt: currentDate,
	}).getResult();


	const persistence: IUser = {
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
