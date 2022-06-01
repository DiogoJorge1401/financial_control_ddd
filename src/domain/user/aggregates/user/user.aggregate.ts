import { EmailValueObject, PasswordValueObject, TermValueObject } from '@domain/user/value-objects';
import { AggregateRoot, BaseDomainEntity, DomainId, Result } from 'types-ddd';

interface UserAggregateProps extends BaseDomainEntity {
	email: EmailValueObject
	password: PasswordValueObject
	budgetBoxIds?: DomainId[]
	totalBalanceAvailable: number
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
	get budgetBoxIds () {
		return this.props.budgetBoxIds ?? [];
	}
	get totalBalanceAvailable (): number {
		return this.props.totalBalanceAvailable;
	}
	get terms () {
		return this.props.terms;
	}

	static create (props: UserAggregateProps): Result<UserAggregate> {
		return Result.ok(new UserAggregate(props));
	}
}