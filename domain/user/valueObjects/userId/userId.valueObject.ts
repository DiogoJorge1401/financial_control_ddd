import { Entity, Result, UniqueEntityID } from 'types-ddd';

interface UserIdValueObjectProps {
	ID?: UniqueEntityID
}

export class UserIdValueObject extends Entity<any>{
	private constructor (props: UserIdValueObjectProps) {
		super({ ID: props?.ID ?? new UniqueEntityID() }, UserIdValueObject.name);
	}

	get id () {
		return this._id;
	}

	static create (ID?: UniqueEntityID): Result<UserIdValueObject> {
		return Result.ok<UserIdValueObject>(new UserIdValueObject({ ID }));
	}
}