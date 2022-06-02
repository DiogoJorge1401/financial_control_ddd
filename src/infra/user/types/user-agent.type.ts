import { operationalSystem } from '@domain/user/value-objects';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserAgentType {
  @Field()
  	name: string;

  @Field()
  	version: string;

  @Field()
  	os: operationalSystem;

  @Field()
  	type: string;
}