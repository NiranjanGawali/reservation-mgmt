import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateChareMessage } from '../types';

export class CheckoutPayment implements Omit<CreateChareMessage, 'email'> {
  @IsNumber()
  @Type(() => Number)
  amount: number;
}
