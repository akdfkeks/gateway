import { Auth } from '@app/common/constants/auth.constants';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Actor } from '../types/actor';
import { UserEntity } from './domain/entities/user.entity';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { IAuthServiceClient } from './interfaces/auth-client.interface';

export class AuthClientService implements IAuthServiceClient {
  constructor(
    @Inject(Auth.SERVICE_NAME) private readonly client: ClientProxy,
  ) {}

  public async create(
    payload: CreateUserRequestDto,
    actor: Actor,
  ): Promise<UserEntity> {
    const response = this.client.send(
      { cmd: Auth.Event.USER_CREATE },
      { data: payload, actor },
    );

    const data = await firstValueFrom<UserEntity>(response);

    return data;
  }
}
