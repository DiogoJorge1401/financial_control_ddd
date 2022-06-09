import { ITerm } from '@shared/interfaces';

export interface SignUpDTO {
  email: string
  password: string
  term: ITerm
  acceptedTerms: boolean;
}