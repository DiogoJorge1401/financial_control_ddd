import { Result, ValueObject } from 'types-ddd';
import isISO8601 from 'validator/lib/isISO8601'

interface AcceptedAtValueObjectProps {
  value: string
}

export class AcceptedAtValueObject extends ValueObject<AcceptedAtValueObjectProps>{
  private constructor(props: AcceptedAtValueObjectProps) { super(props) }

  get value() {
    return this.props.value
  }

  static create(acceptedAt: string): Result<AcceptedAtValueObject> {
    const isValidAcceptedAt = isISO8601(acceptedAt);
    if (!isValidAcceptedAt)
      return Result.fail('Invalid AcceptedAt');
    return Result.ok(new AcceptedAtValueObject({ value: acceptedAt }));
  }
}