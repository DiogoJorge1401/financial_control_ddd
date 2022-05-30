import { ValueObject, BudgetIdValueObject, Result } from '@/domain/shared';

interface TransactionCalculation {
  budgetBoxId: BudgetIdValueObject
  monetaryValue: number
}

interface TransactionCalculationValueObjectProps {
  value: TransactionCalculation
}

export class TransactionCalculationValueObject extends ValueObject<TransactionCalculationValueObjectProps>{
  private constructor(props: TransactionCalculationValueObjectProps) {
    super(props)
  }

  get value() {
    return this.props.value
  }

  static create(calculation: TransactionCalculation): Result<TransactionCalculationValueObject> {
    const isValidMonetaryValue = calculation.monetaryValue > 0
    if(!isValidMonetaryValue)
      return Result.fail("Invalid monetay value, must be greater than 0")
    return Result.ok(new TransactionCalculationValueObject({
      value: calculation
    }))
  }
}