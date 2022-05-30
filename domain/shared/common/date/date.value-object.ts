import { format, isDate } from 'date-fns';
import { Result, ValueObject } from '@/domain/shared/core';

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
				return Result.fail('Invalid date');
			return Result.ok(new DateValueObject({ value: date }));
		} catch (err) {
			return Result.fail('Invalid date');
		}
	}
}