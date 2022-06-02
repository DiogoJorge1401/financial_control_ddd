import { Field, InputType } from '@nestjs/graphql';
import { UserAgentInput } from './user-agent.input';

@InputType()
export class TermInput {
  @Field()
  	ip: string;

  @Field()
  	acceptedAt: Date;

  @Field(() => UserAgentInput)
  	userAgent: UserAgentInput;
}