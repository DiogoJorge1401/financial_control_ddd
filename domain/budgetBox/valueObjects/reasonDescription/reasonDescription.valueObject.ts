import { ValueObject,Result} from '@/domain/shared';

interface ReasonDescriptionValueObjectProps{
  value:string
}

export class ReasonDescriptionValueObject extends ValueObject<ReasonDescriptionValueObjectProps>{
	private constructor (props:ReasonDescriptionValueObjectProps){
		super(props);
	}

	get value (){
		return this.props.value;
	}

	static create (description:string):Result<ReasonDescriptionValueObject>{
		const descriptionSanitized = description.trim();
		const isValidDescriptionLength = descriptionSanitized.length >= 1 && descriptionSanitized.length <= 20;
		if (!isValidDescriptionLength)
			return Result.fail<ReasonDescriptionValueObject>('Description must have minimum 1 and max 20 characters');
		return Result.ok<ReasonDescriptionValueObject>(new ReasonDescriptionValueObject({value:descriptionSanitized.toLowerCase()}));
	}
}