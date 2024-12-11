import { CheckoutPayment } from '@app/core-lib';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { isDefined, IsEmail } from 'class-validator';

@InputType()
export class CreateCheckoutDto extends CheckoutPayment {
  @IsEmail()
  @Field()
  email: string;
}
