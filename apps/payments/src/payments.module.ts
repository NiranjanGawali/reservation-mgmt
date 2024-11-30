import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from '@app/core-lib';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PAYMENTS_TCP_PORT: Joi.number().required(),
        PAYMENTS_HTTP_PORT: Joi.number().required(),
        RAZORPAY_API_KEY: Joi.string().required(),
        RAZORPAY_API_SECRET: Joi.string().required(),
      }),
      envFilePath: './apps/payments/.env',
    }),
    LoggerModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
