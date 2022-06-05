import { ValueObject, Result } from 'types-ddd';
import { ERROR_MESSAGES } from '@shared/utils';

interface TransactionNoteValueObjectProps {
	value: string
}

export class TransactionNoteValueObject extends ValueObject<TransactionNoteValueObjectProps>{
	private constructor (props: TransactionNoteValueObjectProps) {
		super(props);
	}

	get value () {
		return this.props.value;
	}
	static isTheValueValid (value:string):boolean{
		const valueLength = value.length;
		const isTheValueLengthValid = valueLength >= 4 && valueLength <= 144;
		return isTheValueLengthValid;
	}
	static create (value: string): Result<TransactionNoteValueObject> {
		if (!this.isTheValueValid(value))
			return Result.fail(ERROR_MESSAGES.TRANSACTION_INVALID_NOTE_LENGTH);
		return Result.ok(new TransactionNoteValueObject({ value }));
	}
}