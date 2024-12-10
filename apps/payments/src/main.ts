import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { PAYMENTS_PACKAGE_NAME } from '@app/core-lib';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser());

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: PAYMENTS_PACKAGE_NAME,
      protoPath: join(__dirname, '../../../proto/payments.proto'),
      url: configService.getOrThrow('PAYMENTS_GRPC_URL'),
    },
  });

  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.startAllMicroservices();
  await app.listen(configService.get('PAYMENTS_HTTP_PORT'));
}
bootstrap();
