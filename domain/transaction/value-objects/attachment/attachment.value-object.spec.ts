import { ERROR_MESSAGES } from '@/domain/shared/common';
import { AttachmentValueObject } from './attachment.value-object';

describe('attachment.value-object', () => {
	it('should create a valid attachment', () => {
		const validUrl = 'http://pa.fk/ud';
		const attachment = AttachmentValueObject.create(validUrl);
		expect(attachment.isSuccess).toBe(true);
		expect(attachment.getResult().value).toBe(validUrl);
	});
	it('should create a attachment with a valid directory path', () => {
		const attachment = AttachmentValueObject.create('./folder/public/image.jpeg');
		expect(attachment.isSuccess).toBe(true);
		expect(attachment.getResult().value).toBe('./folder/public/image.jpeg');
	});
	it('should fail if provide an invalid url', () => {
		const attachment = AttachmentValueObject.create('invalid_url');
		expect(attachment.isFailure).toBe(true);
		expect(attachment.error).toBe(ERROR_MESSAGES.TRANSACTION_INVALID_ATTACHMENT_PATH);
	});
});
