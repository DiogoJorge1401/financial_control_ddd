import { AggregateRoot, BaseDomainEntity, CurrencyValueObject, DateValueObject, DomainId, Result } from 'types-ddd';
import { ReasonDescriptionValueObject } from '@domain/budget-box/value-objects';
import {
	AttachmentValueObject,
	TransactionCalculationValueObject,
	TransactionNoteValueObject,
	TransactionStatusValueObject,
	TransactionTypeValueObject
} from '@domain/transaction/value-objects';
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
}

export class TransactionAggregate extends AggregateRoot<TransactionAggregateProps>{
	private _totalAmount: CurrencyValueObject;
	private constructor (props: TransactionAggregateProps) {
		super(props, TransactionAggregate.name);
		this._totalAmount = this.calculateTotalAmount();
	}
	private calculateTotalAmount (): CurrencyValueObject {
		const aux = CurrencyValueObject
			.create({ currency: CURRENCY, value: 0 })
			.getResult();

		this.transactionCalculations.forEach((cal) => aux.add(cal.calculation.currency.value));

		return aux;
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
	get transactionNote (): TransactionNoteValueObject {
		return this.props.transactionNote ?? null;
	}
	get attachment (): AttachmentValueObject {
		return this.props.attachment ?? null;
	}
	get transactionCalculations (): Array<TransactionCalculationValueObject> {
		return this.props.transactionCalculations;
	}
	get totalAmount (): number {
		return this._totalAmount.value;
	}
	static create (props: TransactionAggregateProps): Result<TransactionAggregate> {
		return Result.ok(new TransactionAggregate(props));
	}
}