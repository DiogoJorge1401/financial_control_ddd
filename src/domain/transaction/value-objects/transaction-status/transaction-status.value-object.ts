import { ValueObject, Result } from 'types-ddd';
import { ERROR_MESSAGES } from '@shared/common';

enum ETransactionStatus { PENDENTE, CONCLUIDO }
type TransactionStatus = keyof typeof ETransactionStatus;
interface TransactionStatusValueObjectProps { value: TransactionStatus }

export class TransactionStatusValueObject extends ValueObject<TransactionStatusValueObjectProps>{
	private constructor (props: TransactionStatusValueObjectProps) {
		super(props);
	}

	get value () {
		return this.props.value;
	}

	static create (value: TransactionStatus): Result<TransactionStatusValueObject> {
		const isValidValue = Object.keys(ETransactionStatus).includes(value);
		if (!isValidValue)
			return Result.fail(ERROR_MESSAGES.TRANSACTION_INVALID_STATUS);
		return Result.ok(new TransactionStatusValueObject({ value }));
	}
}