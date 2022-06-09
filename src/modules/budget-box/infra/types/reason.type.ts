import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReasonType {
  @Field()
  id!: string;

  @Field()
  description!: string

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}