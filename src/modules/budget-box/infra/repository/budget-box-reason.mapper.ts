import { ReasonDomainEntity } from '@budget-box/domain/entity';
import { ReasonDescriptionValueObject } from '@budget-box/domain/value-object';
import { IReason } from '@shared/interfaces/reason-model.interface';
import { DomainId, Result, TMapper } from 'types-ddd';

export class BudgetBoxReasonMapperToDomain implements TMapper<IReason, ReasonDomainEntity>{
	map (target: IReason): Result<ReasonDomainEntity, string> {

		const description = ReasonDescriptionValueObject.create(target.description);
		if (description.isFailure)
			return Result.fail(description.errorValue());

		return ReasonDomainEntity.create({
			ID: DomainId.create(target.id),
			description: description.getResult(),
			createdAt: target.createdAt,
			updatedAt: target.updatedAt,
			deletedAt: undefined,
			isDeleted: false
		});

	}
}