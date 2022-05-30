import { ValueObject, Result } from '@/domain/shared';

interface TransactionNoteValueObjectProps {
  value: string
}

export class TransactionNoteValueObject extends ValueObject<TransactionNoteValueObjectProps>{
  private constructor(props: TransactionNoteValueObjectProps) {
    super(props)
  }

  get value() {
    return this.props.value
  }

  static create(value: string): Result<TransactionNoteValueObject> {
    const valueLength = value.length;
    const isValidValueLength = valueLength >= 4 && valueLength <= 144;
    if(!isValidValueLength)
      return Result.fail('Note must have minimum 4 and max 144 characters')
    return Result.ok(new TransactionNoteValueObject({ value }))
  }
}