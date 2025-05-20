import { Auth } from '@app/common/constants/auth.constants';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Actor } from '../types/actor';
import { UserEntity } from './domain/entities/user.entity';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { IAuthServiceClient } from './interfaces/auth-client.interface';
import { LoginRequestDto } from './dto/login.dto';

export class AuthClientService implements IAuthServiceClient {
  constructor(
    @Inject(Auth.SERVICE_NAME) private readonly client: ClientProxy,
  ) {}

  public async createUser(
    data: CreateUserRequestDto,
    actor: Actor,
  ): Promise<UserEntity> {
    const response = this.client.send(
      { cmd: Auth.Event.USER_CREATE },
      { data, actor },
    );

    const result = await firstValueFrom<UserEntity>(response);

    return result;
  }

  public async login(
    data: LoginRequestDto,
    actor: Actor,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const response = this.client.send(
      { cmd: Auth.Event.USER_LOGIN },
      { data, actor },
    );

    const result = await firstValueFrom<any>(response);

    return result;
  }

  public async verifyToken(
    payload: { accessToken: string },
    actor: Actor,
  ): Promise<any> {
    const response = this.client.send({ cmd: Auth.Event.USER_VERIFY }, {});

    const data = await firstValueFrom<any>(response);

    return data;
  }
  public async refreshToken(): Promise<any> {
    const response = this.client.send(
      { cmd: Auth.Event.USER_REFRESH_TOKEN },
      {},
    );

    const data = await firstValueFrom<any>(response);

    return data;
  }
}
