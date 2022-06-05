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
	static isTheValueValid (value:string):boolean{
		const isTheDescriptionLengthValid = value.length >= 1 && value.length <= 30;
		return isTheDescriptionLengthValid;
	}
	static create (description: string): Result<BudgetDescriptionValueObject> {
		const descriptionSanitized = description.trim();
		if (!this.isTheValueValid(descriptionSanitized))
			return Result.fail<BudgetDescriptionValueObject>(ERROR_MESSAGES.BUDGET_INVALID_DESCRIPTION_LENGTH);
		return Result.ok<BudgetDescriptionValueObject>(new BudgetDescriptionValueObject({ value: descriptionSanitized.toLowerCase() }));
	}
}