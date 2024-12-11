import { Query, Resolver } from '@nestjs/graphql';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { PaymentsService } from './payments.service';
import { PaymentParentResponse } from './dto/payment-parent-response.dto';
// import { PaymentsDto } from './dto/payments.dto';

@Resolver(() => CreateCheckoutDto)
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Query(() => PaymentParentResponse, { name: 'payments' })
  getPayments() {
    return this.paymentsService.getPayments();
  }
}
