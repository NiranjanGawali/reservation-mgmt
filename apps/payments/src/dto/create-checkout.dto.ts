import { CheckoutPayment } from '@app/core-lib';
import { isDefined, IsEmail } from 'class-validator';

export class CreateCheckoutDto extends CheckoutPayment {
  @IsEmail()
  email: string;
}
