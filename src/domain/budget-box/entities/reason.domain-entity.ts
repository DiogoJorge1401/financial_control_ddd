import { BaseDomainEntity, Entity, Result } from 'types-ddd';
import { ReasonDescriptionValueObject } from '@domain/budget-box/value-objects';

export interface ReasonProps extends BaseDomainEntity {
	description: ReasonDescriptionValueObject;
}

export class ReasonDomainEntity extends Entity<ReasonProps> {
	private constructor (props: ReasonProps) {
		super(props, ReasonDomainEntity.name);
	}

	get description (): ReasonDescriptionValueObject {
		return this.props.description;
	}

	public static create (props: ReasonProps): Result<ReasonDomainEntity> {
		return Result.ok<ReasonDomainEntity>(new ReasonDomainEntity(props));
	}
}