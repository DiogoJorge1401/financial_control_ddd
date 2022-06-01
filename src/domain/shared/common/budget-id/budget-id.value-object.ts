import { Entity } from '@shared/core';
import { Result, UniqueEntityID } from 'types-ddd';

export class BudgetIdValueObject extends Entity<any>{
	private constructor (id?: UniqueEntityID) {
		super(null, id);
	}

	get id () {
		return this._id;
	}

	static create (id?: UniqueEntityID): Result<BudgetIdValueObject> {
		return Result.ok<BudgetIdValueObject>(new BudgetIdValueObject(id));
	}
}