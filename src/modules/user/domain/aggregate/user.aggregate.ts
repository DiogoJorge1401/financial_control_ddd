import { TermValueObject } from '@user/domain/value-object';
import { AggregateRoot, BaseDomainEntity, EmailValueObject, PasswordValueObject, Result } from 'types-ddd';

interface UserAggregateProps extends BaseDomainEntity {
	email: EmailValueObject
	password: PasswordValueObject
	terms: Array<TermValueObject>
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