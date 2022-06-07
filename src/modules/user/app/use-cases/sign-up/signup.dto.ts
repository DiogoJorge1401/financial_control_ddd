import { ITerm } from '@shared/interfaces/user-model-interface';

export interface SignUpDTO {
  email: string
  password: string
  term: ITerm
  acceptedTerms: boolean;
}