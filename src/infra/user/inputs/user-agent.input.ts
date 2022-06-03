import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserAgentInput {
  @Field()
  	name: string;

  @Field()
  	version: string;

  @Field()
  	os: string;

  @Field()
  	type: string;
}