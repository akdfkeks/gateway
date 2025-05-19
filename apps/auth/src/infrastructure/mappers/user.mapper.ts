import { UserEntity } from '../../domain/entities/user.entity';
import { UserDocument } from '@app/database/schemas/user.schema';

export class UserMapper {
  static toDomain(doc: UserDocument): UserEntity {
    return new UserEntity(doc.id, doc.username, doc.password, doc.role);
  }

  static toPersistence(entity: UserEntity): Partial<UserDocument> {
    return {
      username: entity.username,
      password: entity.password,
      role: entity.role,
    };
  }
}
