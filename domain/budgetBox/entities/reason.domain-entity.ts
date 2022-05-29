import { BaseDomainEntity, Entity, Result, UniqueEntityID } from '@/domain/shared';
import { ReasonDescriptionValueObject } from '../valueObjects';

interface ReasonDomainEntityProps extends BaseDomainEntity{
  description:ReasonDescriptionValueObject
}

export class ReasonDomainEntity extends Entity<ReasonDomainEntityProps>{
	private constructor (props:ReasonDomainEntityProps,id?:UniqueEntityID){
		super(props,id);
	}

	get description ():ReasonDescriptionValueObject{
		return this.props.description;
	}

	get id ():UniqueEntityID{
		return this._id;
	}

	static create (description:ReasonDescriptionValueObject,id?:UniqueEntityID):Result<ReasonDomainEntity>{
		return Result.ok<ReasonDomainEntity>(new ReasonDomainEntity({description},id));
	}
}