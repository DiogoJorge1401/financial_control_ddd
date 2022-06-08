import { IReason } from './reason-model.interface';
import { ICurrency } from './transaction-model.interface';

export interface IBudgetBox {
  readonly id: string

  ownerId: string

  description: string

  balanceAvailable: ICurrency

  isPercentage: boolean

  budgetPercentage: number

  reasons: Array<IReason>

  createdAt: Date

  updatedAt: Date

  isDeleted?: boolean

  deletedAt?: Date
}