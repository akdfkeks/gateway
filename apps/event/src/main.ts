import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { EventModule } from './event.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(EventModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: new ConfigService().getOrThrow('APP_PORT'),
    },
  });
  await app.listen();
}
bootstrap();
