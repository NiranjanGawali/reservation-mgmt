import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CheckoutPayment {
  @IsNumber()
  @Type(() => Number)
  @Field()
  amount: number;
}
