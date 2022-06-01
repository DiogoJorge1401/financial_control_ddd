import { ValueObject, Result } from "types-ddd";
import { ERROR_MESSAGES } from '@shared/common';

enum ETransactionType { ENTRADA, SAIDA }
type TransactionType = keyof typeof ETransactionType;
interface TransactionTypeValueObjectProps { value: TransactionType }

export class TransactionTypeValueObject extends ValueObject<TransactionTypeValueObjectProps>{
	private constructor (props: TransactionTypeValueObjectProps) {
		super(props);
	}

	get value (): TransactionType {
		return this.props.value;
	}

	static create (value: TransactionType): Result<TransactionTypeValueObject> {
		const isValidValue = Object.keys(ETransactionType).includes(value);
		if (!isValidValue)
			return Result.fail(ERROR_MESSAGES.TRANSACTION_INVALID_TYPE);
		return Result.ok(new TransactionTypeValueObject({ value }));
	}
}