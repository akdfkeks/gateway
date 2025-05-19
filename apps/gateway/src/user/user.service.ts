import { AuthClientService } from '@app/common/microservices/auth-client/auth-client.service';
import { CreateUserRequestDto } from '@app/common/microservices/auth-client/dto/create-user.dto';
import { Actor } from '@app/common/microservices/types/actor';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly authClient: AuthClientService) {}

  async registerUser(dto: CreateUserRequestDto, actor: Actor) {
    const user = await this.authClient.create(dto, actor);
    return user;
  }
}
