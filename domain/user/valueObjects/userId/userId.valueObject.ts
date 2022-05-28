import { Result, UniqueEntityID, ValueObject } from 'types-ddd';

interface UserIdValueObjectProps{
  _id: UniqueEntityID
}

export class UserIdValueObject extends ValueObject<UserIdValueObjectProps>{
	private constructor (id?: UniqueEntityID) {
		super({ _id: id??new UniqueEntityID()});
	}

	get id ():UniqueEntityID{
		return this.props._id;
	}

	static create (id?: UniqueEntityID): Result<UserIdValueObject> {
		return Result.ok<UserIdValueObject>(new UserIdValueObject(id));
	}
}