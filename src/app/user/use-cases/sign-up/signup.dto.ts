import { Term } from '@infra/user/entities/user.schema';

export interface SignUpDTO {
  email: string
  password: string
  term: Term
  acceptedTerms: boolean;
}