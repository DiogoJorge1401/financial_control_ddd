import { Term } from '@infra/user/entities/user.schema';

export interface SignupDTO {
  email: string
  password: string
  term: Term
}