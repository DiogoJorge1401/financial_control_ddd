import { ValueObject, Result } from '@/domain/shared/core';
import isURL from 'validator/lib/isURL';

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
			return Result.fail('Invalid path');
		return Result.ok(new AttachmentValueObject({ value: path }));
	}
}