import { Module } from '@nestjs/common';
import { UserHandler } from './handlers/user.handler';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { CreateUserUseCase } from './application/usecases/create-user.usecase';
import { Argon2PasswordHasher } from '@app/common/util/password.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './config/env.validation';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'auth.env',
      isGlobal: true,
      validate,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb://${configService.getOrThrow('DATABASE_HOST')}:${configService.getOrThrow('DATABASE_PORT')}`,
        dbName: configService.getOrThrow('DATABASE_NAME'),
        auth: {
          username: configService.getOrThrow('DATABASE_USERNAME'),
          password: configService.getOrThrow('DATABASE_PASSWORD'),
        },
      }),
    }),
    DatabaseModule,
  ],
  controllers: [UserHandler],
  providers: [
    {
      provide: 'PasswordHasher',
      useClass: Argon2PasswordHasher,
    },
    CreateUserUseCase,
    UserRepository,
  ],
})
export class AuthModule {}
