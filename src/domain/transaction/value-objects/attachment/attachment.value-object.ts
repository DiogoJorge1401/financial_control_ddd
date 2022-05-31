import { ValueObject, Result } from 'types-ddd';
import isURL from 'validator/lib/isURL';
import { ERROR_MESSAGES } from '@shared/common';

interface AttachmentValueObjectProps {
  value: string
}

export class AttachmentValueObject extends ValueObject<AttachmentValueObjectProps>{
	private constructor (props: AttachmentValueObjectProps) {
		super(props);
	}

	get value () {
		return this.props.value;
	}

	static create (path: string): Result<AttachmentValueObject> {
		const regexValidation = /^(.+)\/([^\/]+)$/;
		const isValidPath = regexValidation.test(path);
		const isValidurl = isURL(path);
		if (!isValidPath && !isValidurl)
			return Result.fail(ERROR_MESSAGES.TRANSACTION_INVALID_ATTACHMENT_PATH);
		return Result.ok(new AttachmentValueObject({ value: path }));
	}
}