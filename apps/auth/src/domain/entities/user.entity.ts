import { UserRole } from '@app/common/microservices/auth-client/domain/entities/user.entity';

export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly password: string,
    public readonly role: `${UserRole}` = UserRole.USER,
  ) {}

  static async create(payload: {
    id: string;
    username: string;
    password: string;
  }) {
    const { id, username, password } = payload;
    return new UserEntity(id, username, password);
  }
}
