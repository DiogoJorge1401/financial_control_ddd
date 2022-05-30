import { ERROR_MESSAGES } from '@/domain/shared/common';
import { TransactionNoteValueObject } from './transaction-note.value-object';

describe('transaction-note.value-object', () => {
	it('should create a valid transaction note', () => {
		const note = TransactionNoteValueObject.create('valid_note');
		expect(note.isSuccess).toBe(true);
		expect(note.getResult().value).toBe('valid_note');
	});
	it('should fail if provide a text longer than 144 characters', () => {
		const note = TransactionNoteValueObject.create(
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro suscipit ad nisi fuga nobis animi eveniet reprehenderit eaque maiores consequatur.'
		);
		expect(note.isFailure).toBe(true);
		expect(note.error).toBe(ERROR_MESSAGES.TRANSACTION_INVALID_NOTE_LENGTH);
	});
	it('should fail if provide a text smaller than 4 characters', () => {
		const note = TransactionNoteValueObject.create('123');
		expect(note.isFailure).toBe(true);
		expect(note.error).toBe(ERROR_MESSAGES.TRANSACTION_INVALID_NOTE_LENGTH);
	});
});
