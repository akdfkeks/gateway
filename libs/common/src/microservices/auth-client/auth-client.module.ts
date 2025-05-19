// libs/auth-client/auth-client.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthClientService } from './auth-client.service';
import { Auth } from '@app/common/constants/auth.constants';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: Auth.SERVICE_NAME,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.getOrThrow(Auth.EnvKey.SERVICE_HOST),
            port: config.getOrThrow(Auth.EnvKey.SERVICE_PORT),
          },
        }),
      },
    ]),
  ],
  providers: [AuthClientService],
  exports: [AuthClientService],
})
export class AuthClientModule {}
