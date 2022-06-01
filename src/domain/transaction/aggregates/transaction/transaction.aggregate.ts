import { ReasonIdValueObject, UserIdValueObject } from '@shared/common';
import { AggregateRoot } from '@shared/core';
import { DateValueObject, Result, UniqueEntityID } from 'types-ddd';
import {
	AttachmentValueObject,
	TransactionCalculationValueObject,
	TransactionNoteValueObject,
	TransactionStatusValueObject,
	TransactionTypeValueObject
} from '../../value-objects';

interface TransactionAggregateProps {
  userId: UserIdValueObject
  reasonId: ReasonIdValueObject
  paymentDate: DateValueObject
  transactionType: TransactionTypeValueObject
  transactionStatus: TransactionStatusValueObject
  transactionCalculations: Array<TransactionCalculationValueObject>
  transactionNote?: TransactionNoteValueObject
  attachment?: AttachmentValueObject
}

export class TransactionAggregate extends AggregateRoot<TransactionAggregateProps>{
	private _totalAmount = 0;
	private constructor (props: TransactionAggregateProps, id?: UniqueEntityID) {
		super(props, id);
		this._totalAmount = this.calculateTotalAmount();
	}
	get userId (): UserIdValueObject { return this.props.userId; }
	get reasonId (): ReasonIdValueObject { return this.props.reasonId; }
	get paymentDate (): DateValueObject { return this.props.paymentDate; }
	get transactionType (): TransactionTypeValueObject { return this.props.transactionType; }
	get transactionStatus (): TransactionStatusValueObject { return this.props.transactionStatus; }
	get transactionNote (): TransactionNoteValueObject { return this.props.transactionNote ?? null; }
	get attachment (): AttachmentValueObject { return this.props.attachment ?? null; }
	get transactionCalculations (): Array<TransactionCalculationValueObject> { return this.props.transactionCalculations; }
	get totalAmount (): number { return this._totalAmount; }
	private calculateTotalAmount (): number { return this.transactionCalculations.reduce((acc, el) => el.value.monetaryValue + acc, 0); }
	static create (
		props: TransactionAggregateProps,
		id?: UniqueEntityID
	): Result<TransactionAggregate> { return Result.ok(new TransactionAggregate(props, id)); }
}