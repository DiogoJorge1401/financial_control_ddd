import { Term } from '@infra/user/entities';

export interface SignUpDTO {
  email: string
  password: string
  term: Term
  acceptedTerms: boolean;
}