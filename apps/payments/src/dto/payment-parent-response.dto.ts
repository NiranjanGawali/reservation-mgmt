import { Field, ObjectType, Int } from '@nestjs/graphql';
import { PaymentDto } from './payments.dto';

@ObjectType()
export class PaymentParentResponse {
  @Field()
  entity: string;

  @Field(() => Int)
  count: number;

  @Field(() => [PaymentDto])
  items: PaymentDto[];
}
