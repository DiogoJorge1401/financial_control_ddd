import { ERROR_MESSAGES } from '@shared/common';
import { TransactionStatusValueObject } from './transaction-status.value-object';

describe('transaction-status.value-object', () => {
	it('should create a valid status', () => {
		const status = TransactionStatusValueObject.create('PENDENTE');
		expect(status.isSuccess).toBe(true);
		expect(status.getResult().value).toBe('PENDENTE');
	});
	it('should fail if the provided value is not valid', () => {
		const status = TransactionStatusValueObject.create('Blah' as any);
		expect(status.isFailure).toBe(true);
		expect(status.error).toBe(ERROR_MESSAGES.TRANSACTION_INVALID_STATUS);
	});
});
