import { UserAggregate } from '@user/domain/aggregate';
import { IpValueObject, TermValueObject } from '@user/domain/value-object';
import { DateValueObject, DomainId, EmailValueObject, PasswordValueObject, Result, TMapper } from 'types-ddd';
import { IUser } from '@shared/interfaces/user-model-interface';

export class UserMapper implements TMapper<IUser, UserAggregate>{
	map({ id, email, password, terms, createdAt, updatedAt, }: IUser): Result<UserAggregate, string> {
		return UserAggregate.create({
			ID: DomainId.create(id),
			email: EmailValueObject.create(email).getResult(),
			password: PasswordValueObject.create(password).getResult(),
			terms: terms.map(({ acceptedAt, ip, userAgent }) => TermValueObject.create({
				isAccepted: true,
				acceptedAt: DateValueObject.create(acceptedAt).getResult(),
				ip: IpValueObject.create(ip).getResult(),
				userAgent
			}).getResult()),
			createdAt,
			updatedAt
		});
	}


}