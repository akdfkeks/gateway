// apps/gateway/src/user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from '@app/common/microservices/auth-client/dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserRequestDto) {
    const actor = { id: 'admin', role: 'admin' };
    const user = await this.userService.registerUser(dto, actor);

    return new CreateUserResponseDto(user);
  }
}
