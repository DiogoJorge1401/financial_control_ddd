import { BaseDomainEntity, Entity, Result, UniqueEntityID } from '@shared/core';
import { ReasonDescriptionValueObject } from '../value-objects';

export interface ReasonProps extends BaseDomainEntity {
  description: ReasonDescriptionValueObject;
}

export class ReasonDomainEntity extends Entity<ReasonProps> {
	private constructor (props: ReasonProps, id?: UniqueEntityID) {
		super(props, id);
	}

	get description (): ReasonDescriptionValueObject {
		return this.props.description;
	}

	get id (): UniqueEntityID {
		return this._id;
	}

	public static create (
		description: ReasonDescriptionValueObject,
		id?: UniqueEntityID,
	): Result<ReasonDomainEntity> {
		return Result.ok<ReasonDomainEntity>(new ReasonDomainEntity({description}, id));
	}
}