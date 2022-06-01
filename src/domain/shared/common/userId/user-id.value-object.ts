import { Entity } from '@shared/core';
import { Result, UniqueEntityID } from 'types-ddd';

export class UserIdValueObject extends Entity<any>{
	private constructor (id?: UniqueEntityID) {
		super(null, id);
	}

	get id () {
		return this._id;
	}

	static create (id?: UniqueEntityID): Result<UserIdValueObject> {
		return Result.ok<UserIdValueObject>(new UserIdValueObject(id));
	}
}