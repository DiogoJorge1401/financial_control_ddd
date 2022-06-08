import { TransactionStatus, TransactionType } from '@transaction/domain/value-object';

export interface ICurrency {
  readonly value: number
  readonly currency: 'BRL' | 'USD' | 'EUR' | 'JPY'
}

export interface ICalculation {
  budgetBoxId: string
  readonly currency: ICurrency
}

export interface ITransaction {
  readonly id: string

  readonly userID: string

  readonly reason: string

  readonly paymentDate: Date

  readonly transactionType: TransactionType

  transactionStatus: TransactionStatus

  readonly transactionCalculations: Readonly<Array<ICalculation>>

  transactionNote: string | null

  attachment: string | null

  readonly createdAt: Date

  updatedAt: Date

  isDeleted?: boolean

  deletedAt?: Date

  readonly totalValue?: ICurrency

}