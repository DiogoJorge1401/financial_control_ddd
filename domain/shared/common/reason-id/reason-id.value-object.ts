import { Entity, Result, UniqueEntityID } from '@/domain/shared/core';

export class ReasonIdValueObject extends Entity<any>{
	private constructor (id?: UniqueEntityID) {
		super(null, id);
	}

	get id () {
		return this._id;
	}

	static create (id?: UniqueEntityID): Result<ReasonIdValueObject> {
		return Result.ok<ReasonIdValueObject>(new ReasonIdValueObject(id));
	}
}