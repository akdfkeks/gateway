import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './config/env.validation';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'event.env',
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
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
