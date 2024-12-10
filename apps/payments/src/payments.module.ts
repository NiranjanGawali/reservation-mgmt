import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import {
  HealthModule,
  LoggerModule,
  NOTIFICATIONS_PACKAGE_NAME,
  NOTIFICATIONS_SERVICE,
  NOTIFICATIONS_SERVICE_NAME,
} from '@app/core-lib';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        // PAYMENTS_TCP_PORT: Joi.number().required(),
        PAYMENTS_HTTP_PORT: Joi.number().required(),
        RAZORPAY_API_KEY: Joi.string().required(),
        RAZORPAY_API_SECRET: Joi.string().required(),
        // NOTIFICATIONS_HOST: Joi.string().required(),
        // NOTIFICATIONS_PORT: Joi.number().required(),
      }),
      envFilePath: './apps/payments/.env',
    }),
    LoggerModule,
    ClientsModule.registerAsync([
      {
        name: NOTIFICATIONS_SERVICE_NAME,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: NOTIFICATIONS_PACKAGE_NAME,
            protoPath: join(__dirname, '../../../proto/notifications.proto'),
            url: configService.getOrThrow('NOTIFICATION_GRPC_URL'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    HealthModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
