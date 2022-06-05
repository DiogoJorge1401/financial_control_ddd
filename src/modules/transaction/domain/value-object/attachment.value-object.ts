import { ValueObject, Result } from 'types-ddd';
import isURL from 'validator/lib/isURL';
import { ERROR_MESSAGES } from '@shared/utils';

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
	static isTheValueValid (path:string):boolean{
		const regexValidation = /^(.+)\/([^\/]+)$/;
		const isThePathValid = regexValidation.test(path);
		const isTheUrlValid = isURL(path);

		return !isThePathValid&&!isTheUrlValid;
	}
	static create (path: string): Result<AttachmentValueObject> {
		if (this.isTheValueValid(path))
			return Result.fail(ERROR_MESSAGES.TRANSACTION_INVALID_ATTACHMENT_PATH);
		return Result.ok(new AttachmentValueObject({ value: path }));
	}
}