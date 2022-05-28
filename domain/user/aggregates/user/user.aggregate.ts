import { AggregateRoot } from 'types-ddd';
import { EmailValueObject, PasswordValueObject, TermValueObject } from '../../valueObjects';

interface UserAggregateProps {
  email: EmailValueObject,
  password: PasswordValueObject,
  totalBalanceAvailable: number,
  terms: TermValueObject
}

export class UserAggregate extends AggregateRoot<UserAggregateProps>{
	private constructor (props: UserAggregateProps,id?:UniqueEntityID) {
		super(props, UserAggregate.name);
	}
}