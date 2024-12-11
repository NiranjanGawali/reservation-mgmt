import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentDto {
  @Field()
  id: string;

  @Field(() => Int)
  amount: number;
}
