import { operationalSystem } from '@domain/user/value-objects';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserAgentInput {
  @Field()
  	name: string;

  @Field()
  	version: string;

  @Field()
  	os: operationalSystem;

  @Field()
  	type: string;
}