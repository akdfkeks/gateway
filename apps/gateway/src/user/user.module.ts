import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthClientModule } from '@app/common/microservices/auth-client/auth-client.module';

@Module({
  imports: [AuthClientModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
