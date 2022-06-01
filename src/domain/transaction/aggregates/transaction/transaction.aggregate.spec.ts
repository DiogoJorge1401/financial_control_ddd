import {
	BudgetIdValueObject, ReasonIdValueObject, UserIdValueObject
} from '@shared/common';
import { UniqueEntityID } from 'types-ddd';
import { DateValueObject } from 'types-ddd';
import {
	AttachmentValueObject,
	TransactionCalculationValueObject,
	TransactionNoteValueObject,
	TransactionStatusValueObject,
	TransactionTypeValueObject
} from '../../value-objects';
import { TransactionAggregate } from './transaction.aggregate';

describe('transaction.aggregate', () => {
	it('should create a valid transaction', () => {
		const transaction = TransactionAggregate.create({
			userId: UserIdValueObject.create()
				.getResult(),
			reasonId: ReasonIdValueObject.create()
				.getResult(),
			paymentDate: DateValueObject.create(new Date())
				.getResult(),
			transactionType: TransactionTypeValueObject.create('ENTRADA')
				.getResult(),
			transactionStatus: TransactionStatusValueObject.create('CONCLUIDO')
				.getResult(),
			transactionNote: TransactionNoteValueObject.create('eai money indo')
				.getResult(),
			attachment: AttachmentValueObject.create('http://bawnug.va/gopat')
				.getResult(),
			transactionCalculations: [
				TransactionCalculationValueObject.create({
					budgetBoxId: BudgetIdValueObject.create().getResult(),
					monetaryValue: 100
				}).getResult(),
				TransactionCalculationValueObject.create({
					budgetBoxId: BudgetIdValueObject.create().getResult(),
					monetaryValue: 200
				}).getResult(),
			]
		});
		expect(transaction.isSuccess).toBe(true);
		expect(transaction.getResult().totalAmount).toBe(300);
	});
	it('should create a valid transaction with a provided id', () => {
		const transaction = TransactionAggregate.create({
			userId: UserIdValueObject.create()
				.getResult(),
			reasonId: ReasonIdValueObject.create()
				.getResult(),
			paymentDate: DateValueObject.create(new Date())
				.getResult(),
			transactionType: TransactionTypeValueObject.create('ENTRADA')
				.getResult(),
			transactionStatus: TransactionStatusValueObject.create('CONCLUIDO')
				.getResult(),
			transactionNote: TransactionNoteValueObject.create('eai money indo')
				.getResult(),
			attachment: AttachmentValueObject.create('http://bawnug.va/gopat')
				.getResult(),
			transactionCalculations: [
				TransactionCalculationValueObject.create({
					budgetBoxId: BudgetIdValueObject.create().getResult(),
					monetaryValue: 100
				}).getResult(),
				TransactionCalculationValueObject.create({
					budgetBoxId: BudgetIdValueObject.create().getResult(),
					monetaryValue: 200
				}).getResult(),
			]
		}, new UniqueEntityID('valid_id'));
		expect(transaction.getResult().id.toValue()).toBe('valid_id');
	});
});
