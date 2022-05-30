import { ValueObject, Result } from '@/domain/shared/core';
import { ERROR_MESSAGES } from '@/domain/shared/common';

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

	static create (value: string): Result<TransactionNoteValueObject> {
		const valueLength = value.length;
		const isValidValueLength = valueLength >= 4 && valueLength <= 144;
		if (!isValidValueLength)
			return Result.fail(ERROR_MESSAGES.TRANSACTION_INVALID_NOTE_LENGTH);
		return Result.ok(new TransactionNoteValueObject({ value }));
	}
}