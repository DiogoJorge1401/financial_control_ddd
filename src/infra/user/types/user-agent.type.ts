import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { operationalSystem, IOs } from '@domain/user/value-objects';

registerEnumType(IOs, { name: 'IOs' })

@ObjectType()
export class UserAgentType {
  @Field()
  name: string;

  @Field()
  version: string;

  @Field(() => IOs)
  os: operationalSystem;

  @Field()
  type: string;
}