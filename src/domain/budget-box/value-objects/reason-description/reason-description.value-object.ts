import { ValueObject, Result } from 'types-ddd';
import { ERROR_MESSAGES } from '@shared/common';

interface ReasonDescriptionValueObjectProps {
	value: string
}

export class ReasonDescriptionValueObject extends ValueObject<ReasonDescriptionValueObjectProps>{
	private constructor (props: ReasonDescriptionValueObjectProps) {
		super(props);
	}

	get value () {
		return this.props.value;
	}

	static create (description: string): Result<ReasonDescriptionValueObject> {
		const descriptionSanitized = description.trim();
		const isValidDescriptionLength = descriptionSanitized.length >= 1 && descriptionSanitized.length <= 20;
		if (!isValidDescriptionLength)
			return Result.fail<ReasonDescriptionValueObject>(ERROR_MESSAGES.BUDGET_INVALID_REASON_DESCRIPTION_LENGTH);
		return Result.ok<ReasonDescriptionValueObject>(new ReasonDescriptionValueObject({ value: descriptionSanitized.toLowerCase() }));
	}
}