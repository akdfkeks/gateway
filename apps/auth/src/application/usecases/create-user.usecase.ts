import { CreateUserRequestDto } from '@app/common/microservices/auth-client/dto/create-user.dto';
import { Actor } from '@app/common/microservices/types/actor';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { ObjectId } from 'mongodb';
import { PasswordHasher } from '@app/common/util/password.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly repo: UserRepository,
    @Inject('PasswordHasher')
    private readonly hasher: PasswordHasher,
  ) {}

  async execute(
    payload: CreateUserRequestDto,
    actor: Actor,
  ): Promise<UserEntity> {
    const exists = await this.repo.findByUsername(payload.username);
    if (exists) {
      throw new RpcException('이미 존재하는 사용자입니다.');
    }

    const id = new ObjectId().toString();
    const password = await this.hasher.hash(payload.password);
    const user = await UserEntity.create({
      id,
      username: payload.username,
      password,
    });

    await this.repo.save(user);

    return user;
  }
}
