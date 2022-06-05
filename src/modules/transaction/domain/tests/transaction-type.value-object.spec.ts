import { ERROR_MESSAGES } from '@shared/utils';
import { TransactionTypeValueObject } from '@transaction/domain/value-object';

describe('transaction-type.value-object', () => {
	it('should create a valid transaction type', () => {
		const transactionType = TransactionTypeValueObject.create('ENTRADA');
		expect(transactionType.isSuccess).toBe(true);
		expect(transactionType.getResult().value).toBe('ENTRADA');
	});
	it('should fail if the provided value is not valid', () => {
		const transactionType = TransactionTypeValueObject.create('Blah' as any);
		expect(transactionType.isFailure).toBe(true);
		expect(transactionType.error).toBe(ERROR_MESSAGES.TRANSACTION_INVALID_TYPE);
	});
});
