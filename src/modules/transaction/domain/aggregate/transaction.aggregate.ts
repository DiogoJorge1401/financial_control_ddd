import { AggregateRoot, BaseDomainEntity, CurrencyValueObject, DateValueObject, DomainId, Result } from 'types-ddd';
import { ReasonDescriptionValueObject } from '@budget-box/domain/value-object';
import {
	AttachmentValueObject,
	TransactionCalculationValueObject,
	TransactionNoteValueObject,
	TransactionStatusValueObject,
	TransactionTypeValueObject
} from '@transaction/domain/value-object';
import { CURRENCY } from '@config/env';

interface TransactionAggregateProps extends BaseDomainEntity {
	userID: DomainId
	reason: ReasonDescriptionValueObject
	paymentDate: DateValueObject
	transactionType: TransactionTypeValueObject
	transactionStatus: TransactionStatusValueObject
	transactionCalculations: Array<TransactionCalculationValueObject>
	transactionNote?: TransactionNoteValueObject
	attachment?: AttachmentValueObject
	totalValue?: CurrencyValueObject
}

export class TransactionAggregate extends AggregateRoot<TransactionAggregateProps>{
	private constructor (props: TransactionAggregateProps) {
		super(props, TransactionAggregate.name);
	}

	get totalValue (): CurrencyValueObject {
		return this.props.totalValue;
	}

	get userID (): DomainId {
		return this.props.userID;
	}
	get reason (): ReasonDescriptionValueObject {
		return this.props.reason;
	}
	get paymentDate (): DateValueObject {
		return this.props.paymentDate;
	}
	get transactionType (): TransactionTypeValueObject {
		return this.props.transactionType;
	}
	get transactionStatus (): TransactionStatusValueObject {
		return this.props.transactionStatus;
	}
	get transactionNote (): TransactionNoteValueObject | null {
		return this.props.transactionNote ?? null;
	}
	get attachment (): AttachmentValueObject | null {
		return this.props.attachment ?? null;
	}
	get transactionCalculations (): Array<TransactionCalculationValueObject> {
		return this.props.transactionCalculations;
	}

	private static isValid (props: TransactionAggregateProps): boolean {
		const transactions = props.transactionCalculations;
		const hasTransaction = transactions.length > 0;
		const isTransaction = transactions[0] instanceof TransactionCalculationValueObject;
		return hasTransaction && isTransaction;
	}

	private static calculateTotalAmount (calculation: Array<TransactionCalculationValueObject>): CurrencyValueObject {
		const total = CurrencyValueObject.create({
			currency: CURRENCY,
			value: 0
		}).getResult();

		calculation.forEach((cur) => total.add(cur.currency.value));

		return total;
	}

	static create (props: TransactionAggregateProps): Result<TransactionAggregate> {
		const isValid = this.isValid(props);

		if (!isValid)
			return Result.fail('Calculation is required');

		const currency = this.calculateTotalAmount(props.transactionCalculations);

		props.totalValue = currency;

		const transaction = new TransactionAggregate(props);

		return Result.ok(transaction);
	}
}