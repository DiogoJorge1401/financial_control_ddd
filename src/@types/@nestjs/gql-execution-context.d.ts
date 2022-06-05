import * as gql from '@nestjs/graphql';

/**
  Defining the type of the user object that is passed in the context. 
*/
interface UserRequest {
  userID?: string
}
/**
 * Headers is an object whose keys are strings and whose values are strings.
 * @property {string} [key: string] - string
 */
type Headers = {
  [key: string]: string
};
/**
  Defining the type of the request object that is passed in the context. 
*/
interface Request {
  headers: Headers
  user?: UserRequest
}
/**
  Defining the type of the context object that is passed in the context. 
*/
interface Context {
  req: Request
}

declare module '@nestjs/graphql' {
  class GqlExecutionContext extends gql.ExecutionContextHost implements gql.GraphQLArgumentsHost {
  	static create(context: gql.ExecutionContext): gql.GqlExecutionContext;
  	getType<TContext extends string = gql.GqlContextType>(): TContext;
  	getRoot<T = any>(): T;
  	getArgs<T = any>(): T;
  	getContext(): Context;
  	getInfo<T = any>(): T;
  }
}
