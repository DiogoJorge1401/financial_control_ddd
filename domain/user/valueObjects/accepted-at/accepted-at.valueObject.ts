import { format, isDate } from 'date-fns';
import { Result, ValueObject } from '@/domain/shared/';

interface AcceptedAtValueObjectProps {
  value: Date
}

export class AcceptedAtValueObject extends ValueObject<AcceptedAtValueObjectProps>{
	private constructor (props: AcceptedAtValueObjectProps) { super(props); }

	get value (): string {
		return format(this.props.value, 'yyyy-MM-dd HH:mm:ss');
	}

	static create (date: Date): Result<AcceptedAtValueObject> {
		try {
			const isValidAcceptedAt = isDate(date);
			if (!isValidAcceptedAt)
				return Result.fail('Invalid AcceptedAt');
			return Result.ok(new AcceptedAtValueObject({ value: date }));
		} catch (err) {
			return Result.fail('Invalid AcceptedAt');
		}
	}
}