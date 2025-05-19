import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Auth } from '@app/common/constants/auth.constants';
import { CreateUserUseCase } from '../application/usecases/create-user.usecase';
import { CreateUserRequestDto } from '@app/common/microservices/auth-client/dto/create-user.dto';
import { Actor } from '@app/common/microservices/types/actor';

@Controller()
export class UserHandler {
  constructor(private readonly useCase: CreateUserUseCase) {}

  @MessagePattern({ cmd: Auth.Event.USER_CREATE })
  async handleCreateUser(
    @Payload()
    message: {
      data: CreateUserRequestDto;
      actor: Actor;
    },
  ) {
    const { data, actor } = message;
    return this.useCase.execute(data, actor);
  }
}
