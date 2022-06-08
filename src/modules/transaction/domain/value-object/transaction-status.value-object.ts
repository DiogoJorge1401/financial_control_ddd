import { ValueObject, Result } from 'types-ddd';
import { ERROR_MESSAGES } from '@shared/utils';

enum ETransactionStatus { PENDENTE, CONCLUIDO, ESTORNADO }
export type TransactionStatus = keyof typeof ETransactionStatus;
interface TransactionStatusValueObjectProps { value: TransactionStatus }

export class TransactionStatusValueObject extends ValueObject<TransactionStatusValueObjectProps>{
	private constructor (props: TransactionStatusValueObjectProps) {
		super(props);
	}

	get value () {
		return this.props.value;
	}
	static isTheValueValid (value: string): boolean {
		const isTheValueValid = Object.keys(ETransactionStatus).includes(value);
		return isTheValueValid;
	}
	static create (value: TransactionStatus): Result<TransactionStatusValueObject> {
		if (!this.isTheValueValid(value))
			return Result.fail(ERROR_MESSAGES.TRANSACTION_INVALID_STATUS);
		return Result.ok(new TransactionStatusValueObject({ value }));
	}
}