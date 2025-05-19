import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@app/database/schemas/user.schema';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async save(entity: UserEntity): Promise<void> {
    const doc = new this.userModel(UserMapper.toPersistence(entity));
    await doc.save();
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const doc = await this.userModel.findOne({ username }).exec();
    return doc ? UserMapper.toDomain(doc) : null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const doc = await this.userModel.findById(id).exec();
    return doc ? UserMapper.toDomain(doc) : null;
  }
}
