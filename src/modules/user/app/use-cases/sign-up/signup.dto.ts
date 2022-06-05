import { Term } from '@user/infra/entities';

export interface SignUpDTO {
  email: string
  password: string
  term: Term
  acceptedTerms: boolean;
}