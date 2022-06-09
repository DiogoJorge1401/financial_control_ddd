import { ReasonDomainEntity } from '@budget-box/domain/entity';
import { IMockEntity, IReason } from '@shared/interfaces';
import { DomainId, Result } from 'types-ddd';
import { ReasonDescriptionValueObject } from '@budget-box/domain/value-object';


export class ReasonMock implements IMockEntity<ReasonDomainEntity, IReason>{
	domain (props?: Partial<IReason>): Result<ReasonDomainEntity, string> {
		const ID = DomainId.create(props?.id ?? 'valid_id');
		const description = ReasonDescriptionValueObject.create(props?.description ?? 'valid_description');

		if (description.isFailure)
			return Result.fail(description.errorValue());

		return ReasonDomainEntity.create({
			ID,
			description: description.getResult(),
			createdAt: props?.createdAt ?? new Date('2022-01-01'),
			updatedAt: props?.updatedAt ?? new Date('2022-01-01'),
			deletedAt: undefined,
			isDeleted: false
		});
	}
	model (props?: Partial<IReason>): IReason {
		return {
			id: props?.id ?? 'valid_id',
			description: props?.description ?? 'valid_description',
			createdAt: props?.createdAt ?? new Date('2022-01-01'),
			updatedAt: props?.updatedAt ?? new Date('2022-01-01'),
			deletedAt: undefined,
			isDeleted: false,
		};
	}
}