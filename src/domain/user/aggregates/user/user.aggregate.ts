import { EmailValueObject, PasswordValueObject, TermValueObject } from '@domain/user/value-objects';
import { AggregateRoot, BaseDomainEntity, Result } from 'types-ddd';

interface UserAggregateProps extends BaseDomainEntity {
	email: EmailValueObject
	password: PasswordValueObject
	terms: TermValueObject[]
}

export class UserAggregate extends AggregateRoot<UserAggregateProps>{
	private constructor (props: UserAggregateProps) {
		super(props, UserAggregate.name);
	}
	get email () {
		return this.props.email;
	}
	get password () {
		return this.props.password;
	}
	get terms () {
		return this.props.terms;
	}

	static create (props: UserAggregateProps): Result<UserAggregate> {
		return Result.ok(new UserAggregate(props));
	}
}