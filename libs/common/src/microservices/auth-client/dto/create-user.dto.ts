import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { UserEntity, UserRole } from '../domain/entities/user.entity';

export class CreateUserRequestDto {
  @ApiProperty()
  @IsString()
  @Length(2, 255)
  readonly username: string;

  @ApiProperty()
  @IsString()
  @Length(8, 255)
  readonly password: string;
}

export class CreateUserResponseDto {
  @ApiResponseProperty()
  readonly id: string;

  @ApiResponseProperty()
  readonly username: string;

  @ApiResponseProperty({ enum: UserRole })
  readonly role: string;

  constructor(prop: UserEntity) {
    this.id = prop.id;
    this.username = prop.username;
    this.role = prop.role;
  }
}
