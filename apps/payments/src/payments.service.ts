import { NOTIFICATIONS_SERVICE } from '@app/core-lib';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
// import Razorpay from 'razorpay';
const Razorpay = require('razorpay');

@Injectable()
export class PaymentsService {
  private readonly razorpay: any;

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationService: ClientProxy,
  ) {
    this.razorpay = new Razorpay({
      key_id: this.configService.get('RAZORPAY_API_KEY'),
      key_secret: this.configService.get('RAZORPAY_API_SECRET'),
    });
  }

  async checkOut({ amount, email }: CreateCheckoutDto) {
    try {
      const options = {
        amount: amount * 100,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
      };

      console.log('options : ', options);

      const order = await this.razorpay.orders.create(options);
      console.log('Order : ', order);

      // calling notification service
      this.notificationService.emit('notify_email', {
        email,
        text: `Your payment of rupees ${amount} has completed successfully !!!`,
      });

      return order;
    } catch (err) {
      console.error('Razorpay Checkout Error:', err.message);
      console.error('Error Stack:', err.stack);
      console.error('Error Details:', err.response || err);
      throw err;
    }
  }

  async verification(
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string,
  ) {
    const isPaymentValid = await validatePaymentVerification(
      { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
      razorpay_signature,
      this.configService.get('RAZORPAY_API_SECRET'),
    );
    console.log(isPaymentValid);

    if (isPaymentValid) {
      // await this.paymentModel.create({
      //   razorpay_signature,
      //   razorpay_order_id,
      //   razorpay_payment_id,
      // });
      // here we will save the details in the collection, this logic is not created yet.
    } else {
      throw new BadRequestException('Payment Failed!');
    }
  }
}
