import { TermPersistence } from './terms-persistence.interface'

export interface IUserPersistence{
  email: string
  password: string
  budgetBoxIds?: Array<string>
  totalBalanceAvailable: number
  terms: TermPersistence[]
}