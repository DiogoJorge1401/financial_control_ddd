import { ValueObject, Result } from "@/domain/shared/core";

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
			return Result.fail('Invalid transaction type');
		return Result.ok(new TransactionTypeValueObject({ value }));
	}
}