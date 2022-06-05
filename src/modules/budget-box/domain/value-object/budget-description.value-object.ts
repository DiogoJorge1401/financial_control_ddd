import { ValueObject, Result } from 'types-ddd';
import { ERROR_MESSAGES } from '@shared/utils';

interface BudgetDescriptionValueObjectProps {
	value: string
}

export class BudgetDescriptionValueObject extends ValueObject<BudgetDescriptionValueObjectProps>{
	private constructor (props: BudgetDescriptionValueObjectProps) {
		super(props);
	}

	get value () {
		return this.props.value;
	}

	static create (description: string): Result<BudgetDescriptionValueObject> {
		const descriptionSanitized = description.trim();
		const isValidDescriptionLength = descriptionSanitized.length >= 1 && descriptionSanitized.length <= 30;
		if (!isValidDescriptionLength)
			return Result.fail<BudgetDescriptionValueObject>(ERROR_MESSAGES.BUDGET_INVALID_DESCRIPTION_LENGTH);
		return Result.ok<BudgetDescriptionValueObject>(new BudgetDescriptionValueObject({ value: descriptionSanitized.toLowerCase() }));
	}
}