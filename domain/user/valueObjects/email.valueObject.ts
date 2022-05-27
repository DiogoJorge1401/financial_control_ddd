import { Result, ValueObject } from 'types-ddd';
import isEmail from 'validator/lib/isEmail'
export interface EmailValueObjectProps {
  value: string
}

export class EmailValueObject extends ValueObject<EmailValueObjectProps>{
  private constructor(props: EmailValueObjectProps) { super(props); }

  static create(email: string): Result<EmailValueObject> {
    const isValidEmail = isEmail(email)
    if (!isValidEmail)
      return Result.fail<EmailValueObject>("Invalid email");

    return Result.ok<EmailValueObject>(new EmailValueObject({ value: email }));
  }
}