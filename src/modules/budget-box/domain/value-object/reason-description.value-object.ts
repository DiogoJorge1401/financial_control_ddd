import { ValueObject, Result } from 'types-ddd';
import { ERROR_MESSAGES } from '@shared/utils';

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
	static isTheValueValid (value:string):boolean{
		const isTheValidDescriptionLength = value.length >= 1 && value.length <= 20;
		return isTheValidDescriptionLength;
	}
	static create (description: string): Result<ReasonDescriptionValueObject> {
		const descriptionSanitized = description.trim();
		if (!this.isTheValueValid(descriptionSanitized))
			return Result.fail<ReasonDescriptionValueObject>(ERROR_MESSAGES.BUDGET_INVALID_REASON_DESCRIPTION_LENGTH);
		return Result.ok<ReasonDescriptionValueObject>(new ReasonDescriptionValueObject({ value: descriptionSanitized.toLowerCase() }));
	}
}