import { gql } from 'graphql-request';

export const RESUlT = gql``;

export const TOKEN_RESULT = gql`
	fragment Token on TokenType {
		token
	}
`;

export const SIGNUP_MUTATION = gql`
  mutation($SignUpInput: SignUpInput!) {
    signup(SignUpInput: $SignUpInput)
  }${RESUlT}
`;

export const SIGNIN_MUTATION = gql`
  mutation($SignInInput: SignInInput!) {
		signin(SignInInput: $SignInInput){
			...Token
		}
	}${TOKEN_RESULT}
`;