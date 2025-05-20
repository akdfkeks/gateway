import { Actor } from '../../types/actor';
import { UserEntity } from '../domain/entities/user.entity';
import { CreateUserRequestDto } from '../dto/create-user.dto';
import { LoginRequestDto, LoginResponseDto } from '../dto/login.dto';

export interface IAuthServiceClient {
  createUser(payload: CreateUserRequestDto, actor: Actor): Promise<UserEntity>;
  login(payload: LoginRequestDto, actor: Actor): Promise<LoginResponseDto>;
  verifyToken(): Promise<any>;
  refreshToken(): Promise<any>;
}
