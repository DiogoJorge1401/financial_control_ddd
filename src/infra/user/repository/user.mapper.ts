import { UserAggregate } from '@domain/user/aggregates';
import { IpValueObject, TermValueObject } from '@domain/user/value-objects';
import { DateValueObject, DomainId, EmailValueObject, PasswordValueObject, Result, TMapper } from 'types-ddd';
import { User } from '@infra/user/entities';

export class UserMapper implements TMapper<User, UserAggregate>{
	map ({ id, email, password, terms, createdAt, updatedAt }: User): Result<UserAggregate, string> {
		return UserAggregate.create({
			ID: DomainId.create(id),
			email: EmailValueObject.create(email).getResult(),
			password: PasswordValueObject.create(password).getResult(),
			terms: terms.map(({ acceptedAt, ip, userAgent }) => TermValueObject.create({
				acceptedAt: DateValueObject.create(acceptedAt).getResult(),
				ip: IpValueObject.create(ip).getResult(),
				userAgent
			}).getResult()),
			createdAt,
			updatedAt
		});
	}


}