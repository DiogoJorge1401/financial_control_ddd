import { CurrencyValueObject, DateValueObject, DomainId } from 'types-ddd';

import {
	AttachmentValueObject,
	TransactionCalculationValueObject,
	TransactionNoteValueObject,
	TransactionStatusValueObject,
	TransactionTypeValueObject
} from '@transaction/domain/value-object';
import { CURRENCY } from '@config/env';
import { TransactionAggregate } from '@transaction/domain/aggregate';
import { ReasonDescriptionValueObject } from '@budget-box/domain/value-object';

describe('transaction.aggregate', () => {
	it('should create a valid transaction', () => {
		const transaction = TransactionAggregate.create({
			ID: DomainId.create(),
			userID: DomainId.create(),
			reason: ReasonDescriptionValueObject.create('valid_description').getResult(),
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
					budgetBoxId: DomainId.create(),
					currency: CurrencyValueObject.create({ value: 100, currency: CURRENCY }).getResult()
				}).getResult(),
				TransactionCalculationValueObject.create({
					budgetBoxId: DomainId.create(),
					currency: CurrencyValueObject.create({ value: 200, currency: CURRENCY }).getResult()
				}).getResult(),
			]
		});
		expect(transaction.isSuccess).toBe(true);
		expect(transaction.getResult().totalAmount).toBe(300);
	});
	it('should create a valid transaction with a provided id', () => {
		const ID = DomainId.create();
		const transaction = TransactionAggregate.create({
			ID,
			userID: DomainId.create(),
			reason: ReasonDescriptionValueObject.create('valid_description').getResult(),
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
					budgetBoxId: DomainId.create(),
					currency: CurrencyValueObject.create({ value: 100, currency: CURRENCY }).getResult()
				}).getResult(),
				TransactionCalculationValueObject.create({
					budgetBoxId: DomainId.create(),
					currency: CurrencyValueObject.create({ value: 200, currency: CURRENCY }).getResult()
				}).getResult(),
			]
		});
		expect(transaction.getResult().id.toValue()).toBe(ID.toValue());
	});
});
