import { TransactionMock } from './mock';


describe('transaction.aggregate', () => {
	const transactionMock = new TransactionMock();

	it('should create a valid transaction', () => {
		const transaction = transactionMock.domain();
		expect(transaction.isSuccess).toBe(true);
		expect(transaction.getResult().totalValue.value).toBe(1000);
		expect(transaction.getResult().userID.uid).toBe('valid_user_id');
		expect(transaction.getResult().reason.value).toBe('valid_reason');
		expect(transaction.getResult().paymentDate.value).toBeDefined();
		expect(transaction.getResult().transactionType.value).toBe('ENTRADA');
		expect(transaction.getResult().transactionStatus.value).toBe('CONCLUIDO');
		expect(transaction.getResult().transactionNote?.value).toBeUndefined();
		expect(transaction.getResult().attachment?.value).toBeUndefined();
	});
	it('should create a valid transaction with updated total', () => {
		const transaction = transactionMock.domain({
			id: 'valid_id',
			transactionCalculations: [
				{
					budgetBoxId: 'valid_id',
					currency: {
						currency: 'BRL',
						value: 270
					}
				},
				{
					budgetBoxId: 'valid_id',
					currency: {
						currency: 'BRL',
						value: 30
					}
				}
			]
		});

		expect(transaction.isSuccess).toBe(true);
		expect(transaction.getResult().totalValue.value).toBe(300);
	});
	it('should create a valid transaction with a provided id', () => {
		const transaction = transactionMock.domain({
			id: 'valid_id',
			attachment: 'https://aws.s3.com/bucket-askjdas656/file.pdf',
			transactionNote: 'valid_description'
		});

		expect(transaction.getResult().id.uid).toBe('valid_id');
		expect(transaction.getResult().transactionNote?.value).toBe('valid_description');
		expect(transaction.getResult().attachment?.value).toBe('https://aws.s3.com/bucket-askjdas656/file.pdf');
	});
	it('should apply calculation with success', () => {

		const transaction = transactionMock.domain({
			id: 'valid_id',
			attachment: 'https://aws.s3.com/bucket-askjdas656/file.pdf',
			transactionNote: 'valid_description'
		}).getResult();

		expect(transaction.transactionCalculations).toHaveLength(1);
	});
	it("should fail if dont provide transition calculation", () => {
		const transaction = transactionMock.domain({ transactionCalculations: [] });

		expect(transaction.errorValue()).toBe('Calculation is required');
	});
});
