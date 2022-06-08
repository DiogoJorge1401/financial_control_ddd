import { IMockEntity } from '@shared/interfaces/entity-mock.interface';
import { IUser } from '@shared/interfaces/user-model-interface';
import { UserAggregate } from '@user/domain/aggregate';
import { IpValueObject, TermValueObject } from '@user/domain/value-object';
import { ChangesObserver, DateValueObject, DomainId, EmailValueObject, PasswordValueObject, Result } from 'types-ddd';

export class UserMock implements IMockEntity<UserAggregate, IUser>{
	domain (props?: Partial<IUser>): Result<UserAggregate, string> {

		const ID = DomainId.create(props?.id ?? 'valid_id');
		const email = EmailValueObject.create(props?.email ?? 'validmail@mail.com');
		const password = PasswordValueObject.create(props?.password ?? 'validPassword');
		const ips = props?.terms?.map(term => IpValueObject.create(term.ip));

		const observer = ChangesObserver.init<unknown>(ips);
		observer.add(email);
		observer.add(password);

		if (observer.getResult().isFailure)
			return Result.fail(observer.getResult().errorValue());
		observer.reset();

		const userAgent = {
			name: 'firefox',
			os: 'LINUX',
			type: 'browser',
			version: '86.0.1'
		};
		const ipValueObject = IpValueObject.create('127.0.0.1').getResult();

		const terms = props?.terms?.map(
			(term, index) => TermValueObject.create({
				ip: ips?.[index]?.getResult() ?? ipValueObject,
				isAccepted: true,
				acceptedAt: DateValueObject.create(term?.acceptedAt ?? new Date('2022-01-01')).getResult(),
				userAgent: term?.userAgent ?? userAgent
			})
		) ?? [
			TermValueObject.create({
				ip: ipValueObject,
				isAccepted: true,
				acceptedAt: DateValueObject.create(new Date('2022-01-01')).getResult(),
				userAgent
			})
		];

		terms.map(term => observer.add(term));

		if (observer.getResult().isFailure)
			return Result.fail(observer.getResult().errorValue());

		return UserAggregate.create({
			ID,
			email: email.getResult(),
			password: password.getResult(),
			terms: terms.map(term => term.getResult()),
			createdAt: props?.createdAt ?? new Date('2022-01-01'),
			updatedAt: props?.updatedAt ?? new Date('2022-01-01'),
			isDeleted: false,
			deletedAt: undefined
		});

	}
	model (props?: Partial<IUser>): IUser {
		return {
			id: props?.id ?? 'valid_id',
			email: props?.email ?? 'valid_mail@mail.com',
			password: props?.password ?? 'validPassword123',
			terms: props?.terms ?? [
				{
					isAccepted: true,
					ip: '127.0.0.1',
					acceptedAt: new Date('2022-01-01'),
					userAgent: {
						name: 'firefox',
						os: 'LINUX',
						type: 'browser',
						version: '86.0.1'
					}
				}
			],
			createdAt: props?.createdAt ?? new Date('2022-01-01'),
			updatedAt: props?.updatedAt ?? new Date('2022-01-01'),
			isDeleted: props?.isDeleted ?? false,
		};
	}

}