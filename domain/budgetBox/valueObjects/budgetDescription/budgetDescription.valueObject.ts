import { ValueObject,Result} from '@/domain/shared';

interface BudgetDescriptionValueObjectProps{
  value:string
}

export class BudgetDescriptionValueObject extends ValueObject<BudgetDescriptionValueObjectProps>{
	private constructor (props:BudgetDescriptionValueObjectProps){
		super(props);
	}

	get value (){
		return this.props.value;
	}

	static create (description:string):Result<BudgetDescriptionValueObject>{
		const descriptionSanitized = description.trim();
		const isValidDescriptionLength = descriptionSanitized.length >= 1 && descriptionSanitized.length <= 30;
		if (!isValidDescriptionLength)
			return Result.fail<BudgetDescriptionValueObject>('Description must have minimum 1 and max 30 characters');
		return Result.ok<BudgetDescriptionValueObject>(new BudgetDescriptionValueObject({value:descriptionSanitized.toLowerCase()}));
	}
}