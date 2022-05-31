import { format, isDate } from 'date-fns';
import { Result, ValueObject } from '@shared/core';
import { ERROR_MESSAGES } from '../error-messages';

interface DateObjectProps {
  value: Date
}

export class DateValueObject extends ValueObject<DateObjectProps>{
	private constructor (props: DateObjectProps) { super(props); }

	get value (): string {
		return format(this.props.value, 'yyyy-MM-dd HH:mm:ss');
	}

	static create (date: Date): Result<DateValueObject> {
		try {
			const isValidDate = isDate(date);
			if (!isValidDate)
				return Result.fail(ERROR_MESSAGES.DATE_INVALID_FORMAT);
			return Result.ok(new DateValueObject({ value: date }));
		} catch (err) {
			return Result.fail(ERROR_MESSAGES.DATE_INVALID_FORMAT);
		}
	}
}