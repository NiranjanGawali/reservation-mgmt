import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import {
  PaymentsServiceController,
  PaymentsServiceControllerMethods,
} from '@app/core-lib';

@Controller('payments')
@PaymentsServiceControllerMethods()
export class PaymentsController implements PaymentsServiceController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UsePipes(new ValidationPipe())
  async checkOut(data: CreateCheckoutDto) {
    return await this.paymentsService.checkOut(data);
  }

  /*
  This method handles the verification process, which is the second step in the Razorpay payment flow. 
  It is an API that should be called from the frontend with an object containing the following properties:
  {
    "razorpay_payment_id": "",
    "razorpay_order_id": "",
    "razorpay_signature": ""
  }
  These values are received from the UI. We will focus on the integration of the payment process with the frontend application when implementing this functionality.
*/

  @Post('verification')
  async verification(@Res() res: Response, @Req() req: Request) {
    console.log(req.body);

    const { razorpay_signature, razorpay_order_id, razorpay_payment_id } =
      req.body as any;

    return await this.paymentsService.verification(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    );

    // Below is will be frontend address page where we are goint to redirect
    // res.redirect(`http://localhost:5173/success/${razorpay_payment_id}`);
  }
}
