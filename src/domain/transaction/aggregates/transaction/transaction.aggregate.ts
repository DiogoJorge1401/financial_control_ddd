import { AggregateRoot, BaseDomainEntity, DateValueObject, DomainId, Result } from 'types-ddd';
import { ReasonDescriptionValueObject } from '@domain/budget-box/value-objects';
import {
	AttachmentValueObject,
	TransactionCalculationValueObject,
	TransactionNoteValueObject,
	TransactionStatusValueObject,
	TransactionTypeValueObject
} from '@domain/transaction/value-objects';

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
	private _totalAmount = 0;
	private constructor (props: TransactionAggregateProps) {
		super(props, TransactionAggregate.name);
		this._totalAmount = this.calculateTotalAmount();
	}
	get userID (): DomainId { return this.props.userID; }
	get reason (): ReasonDescriptionValueObject { return this.props.reason; }
	get paymentDate (): DateValueObject { return this.props.paymentDate; }
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
	get totalAmount (): number { return this._totalAmount; }
	private calculateTotalAmount (): number {
		return this.transactionCalculations
			.reduce((acc, el) => el.value.monetaryValue + acc, 0);
	}
	static create (props: TransactionAggregateProps): Result<TransactionAggregate> {
		return Result.ok(new TransactionAggregate(props));
	}
}