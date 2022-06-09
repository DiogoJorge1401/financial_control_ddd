import { IMockEntity } from '@shared/interfaces/entity-mock.interface';
import { ITransaction } from '@shared/interfaces/transaction-model.interface';
import { TransactionAggregate } from '@transaction/domain/aggregate';
import { ChangesObserver, CurrencyValueObject, DateValueObject, DomainId, Result } from 'types-ddd';
import { TransactionCalculationValueObject, TransactionNoteValueObject, TransactionStatusValueObject, TransactionTypeValueObject } from '@transaction/domain/value-object';
import { TransactionReasonDescriptionValueObject } from '@transaction/domain/value-object';
import { CURRENCY } from '@config/env';

export class TransactionMock implements IMockEntity<TransactionAggregate, ITransaction>{
	domain (props?: Partial<ITransaction>): Result<TransactionAggregate, string> {
		const ID = DomainId.create(props?.id ?? 'valid_id');
		const userId = DomainId.create(props?.userID ?? 'valid_user_id');
		const note = props?.transactionNote ? TransactionNoteValueObject.create(props.transactionNote) : null;
		const attachment = props?.attachment ? TransactionNoteValueObject.create(props.attachment) : null;
		const reason = TransactionReasonDescriptionValueObject.create(props?.reason ?? 'valid_reason');
		const transactionType = TransactionTypeValueObject.create(props?.transactionType ?? 'ENTRADA');

		const transactionCalculations = props?.transactionCalculations?.map((calc) => TransactionCalculationValueObject.create({
			budgetBoxId: DomainId.create(calc.budgetBoxId),
			currency: CurrencyValueObject.create(calc.currency).getResult()
		})) ?? [
			TransactionCalculationValueObject.create({
				budgetBoxId: DomainId.create('valid_budget_box_id'),
				currency: CurrencyValueObject.create({ currency: CURRENCY, value: 1000 }).getResult()
			})
		];

		const status = TransactionStatusValueObject.create(props?.transactionStatus ?? 'CONCLUIDO');

		const paymentDate = DateValueObject.create(props?.paymentDate ?? new Date('2022-01-01'));

		const observer = ChangesObserver.init<unknown>(transactionCalculations);
		note && observer.add(note);
		attachment && observer.add(attachment);
		observer.add(transactionType);
		observer.add(status);
		observer.add(paymentDate);
		observer.add(reason);

		const result = observer.getResult();

		if (result.isFailure)
			return Result.fail(result.errorValue());


		return TransactionAggregate.create({
			ID,
			updatedAt: props?.updatedAt ?? new Date('2022-01-01'),
			transactionNote: note?.getResult(),
			createdAt: props?.createdAt ?? new Date('2022-01-01'),
			attachment: attachment?.getResult(),
			userID: userId,
			transactionType: transactionType.getResult(),
			transactionCalculations: transactionCalculations.map(
				(calc) => calc.getResult()
			),
			transactionStatus: status.getResult(),
			reason: reason.getResult(),
			paymentDate: paymentDate.getResult(),
			isDeleted: false,
			deletedAt: undefined,
		});
	}
	model (props?: Partial<ITransaction>): ITransaction {
		return {
			id: props?.id ?? 'valid_id',
			userID: props?.userID ?? 'valid_user_id',
			reason: props?.reason ?? 'valid_reason_id',
			transactionStatus: props?.transactionStatus ?? 'CONCLUIDO',
			attachment: props?.attachment ?? 'http://s3-us-east-1.amazonaws.com/bucket/file.pdf',
			createdAt: props?.createdAt ?? new Date('2022-01-01'),
			transactionNote: props?.transactionNote ?? 'valid_note',
			paymentDate: props?.paymentDate ?? new Date('2022-01-01'),
			totalValue: props?.totalValue ?? {
				currency: 'BRL',
				value: 1000
			},
			transactionCalculations: props?.transactionCalculations ?? [
				{
					budgetBoxId: 'valid_budget_box_id',
					currency: {
						currency: CURRENCY,
						value: 1000
					}
				}
			],
			transactionType: props?.transactionType ?? 'ENTRADA',
			updatedAt: props?.updatedAt ?? new Date('2022-01-01'),
			isDeleted: false,
			deletedAt: undefined,
		};
	}
}