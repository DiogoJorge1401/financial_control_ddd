import { ValueObject, Result } from "types-ddd";
import { ERROR_MESSAGES } from '@shared/utils';

enum ETransactionType { ENTRADA, SAIDA, ESTORNO, TRANSFERENCIA }
export type TransactionType = keyof typeof ETransactionType;
interface TransactionTypeValueObjectProps { value: TransactionType }

export class TransactionTypeValueObject extends ValueObject<TransactionTypeValueObjectProps>{
	private constructor (props: TransactionTypeValueObjectProps) {
		super(props);
	}

	get value (): TransactionType {
		return this.props.value;
	}
	static isTheValueValid (value: string): boolean {
		const isTheValueValid = Object.keys(ETransactionType).includes(value);
		return isTheValueValid;
	}
	static create (value: TransactionType): Result<TransactionTypeValueObject> {
		if (!this.isTheValueValid(value))
			return Result.fail(ERROR_MESSAGES.TRANSACTION_INVALID_TYPE);
		return Result.ok(new TransactionTypeValueObject({ value }));
	}
}