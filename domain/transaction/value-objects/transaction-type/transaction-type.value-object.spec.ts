import { TransactionTypeValueObject } from './transaction-type.value-object';

describe('transaction-type.value-object', () => {
  it('should create a valid transaction type', () => {
    const transactionType = TransactionTypeValueObject.create('ENTRADA');
    expect(transactionType.isSuccess).toBe(true)
    expect(transactionType.getResult().value).toBe('ENTRADA')
  })
  it('should fail if the provided value is not valid', () => {
    const transactionType = TransactionTypeValueObject.create('Blah' as any);
    expect(transactionType.isFailure).toBe(true)
    expect(transactionType.error).toBe('Invalid transaction type')
  })
})
