import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ChatRoom } from '../entities/ChatRoom';
import AppDataSource from '../lib/DataSource';
import { Nullable } from '../types';
import { ChatRoomInput } from '../types/InputType';

class ChatRoomRepository {
  constructor(private repository: Repository<ChatRoom>) {}

  async create(data: ChatRoomInput): Promise<ChatRoom> {
    return await this.repository.save(data);
  }

  async find({ where, ...other }: FindManyOptions<ChatRoom>): Promise<ChatRoom[]> {
    return this.repository.find({
      where,
      ...other,
    });
  }

  async findOne({ where, ...other }: FindOneOptions<ChatRoom>): Promise<Nullable<ChatRoom>> {
    return this.repository.findOne({
      where,
      ...other,
    });
  }
}

const repository = AppDataSource.getRepository(ChatRoom);

export default new ChatRoomRepository(repository);
