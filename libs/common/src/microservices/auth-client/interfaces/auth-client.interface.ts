import { Actor } from '../../types/actor';
import { CreateUserRequestDto, CreateUserResponseDto } from '../dto/create-user.dto';

export interface IAuthServiceClient {
  create(payload: CreateUserRequestDto, actor: Actor): Promise<CreateUserResponseDto>;
  // updateUser(): Promise<any>;
  // deleteUser(): Promise<any>;
  // login(): Promise<any>;
  // logout(): Promise<any>;
  // verifyToken(): Promise<any>;
  // refreshToken(): Promise<any>;
}
