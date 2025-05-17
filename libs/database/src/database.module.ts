import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseSchemas } from '@app/database/schemas';

@Module({
  imports: [MongooseModule.forFeature(mongooseSchemas)],
  exports: [MongooseModule],
})
export class DatabaseModule {}
