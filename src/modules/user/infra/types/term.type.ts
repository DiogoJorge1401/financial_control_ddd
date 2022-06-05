import { Field, ObjectType } from '@nestjs/graphql';
import { UserAgentType } from './user-agent.type';

@ObjectType()
export class TermType {
  @Field()
  	ip: string;

  @Field()
  	acceptedAt: Date;

  @Field(() => UserAgentType)
  	userAgent: UserAgentType;
}