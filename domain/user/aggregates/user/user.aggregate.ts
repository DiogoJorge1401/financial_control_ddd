import { AggregateRoot, Result, UniqueEntityID } from '@/domain/shared';
import { EmailValueObject, PasswordValueObject, TermValueObject } from '@/domain/user/valueObjects';

interface UserAggregateProps {
	email: EmailValueObject
	password: PasswordValueObject
	budgetBoxIds?: string[]
	totalBalanceAvailable: number
	terms: TermValueObject[]
}

export class UserAggregate extends AggregateRoot<UserAggregateProps>{
	private constructor (props: UserAggregateProps, id?: UniqueEntityID) {
		super(props, id);
	}
	get email (){
		return this.props.email;
	}
	get password (){
		return this.props.password;
	}
	get budgetBoxIds (){
		return this.props.budgetBoxIds ?? [];
	}
	get totalBalanceAvailable ():Readonly<number>{
		return this.props.totalBalanceAvailable;
	}
	get terms (){
		return this.props.terms;
	}

	static create (props: UserAggregateProps, id?: UniqueEntityID): Result<UserAggregate> {
		return Result.ok(new UserAggregate(props, id));
	}
}