import { ValueObject,Result} from '@/domain/shared';

interface DescriptionValueObjectProps{
  value:string
}

export class DescriptionValueObject extends ValueObject<DescriptionValueObjectProps>{
	private constructor (props:DescriptionValueObjectProps){
		super(props);
	}

	get value (){
		return this.props.value;
	}

	static create (description:string):Result<DescriptionValueObject>{
		const descriptionTrim = description.trim();
		const isValidDescriptionLength = descriptionTrim.length >= 1 && descriptionTrim.length <= 30;
		if (!isValidDescriptionLength)
			return Result.fail<DescriptionValueObject>('Description must have minimum 1 and max 30 characters');
		return Result.ok<DescriptionValueObject>(new DescriptionValueObject({value:description.toLowerCase()}));
	}
}