import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserAgentType {
  @Field()
  	name: string;

  @Field()
  	version: string;

  @Field()
  	os: string;

  @Field()
  	type: string;
}