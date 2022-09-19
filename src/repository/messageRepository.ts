import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Message } from '../entities/Meessage';
import AppDataSource from '../lib/DataSource';
import { Nullable } from '../types';
import { MessageInput } from '../types/InputType';

class MessageRepository {
  constructor(private repository: Repository<Message>) {}

  async create(data: MessageInput): Promise<Message> {
    return await this.repository.save(data);
  }

  async find({ where, ...other }: FindManyOptions<Message>): Promise<Message[]> {
    return this.repository.find({
      where,
      ...other,
    });
  }

  async findOne({ where, ...other }: FindOneOptions<Message>): Promise<Nullable<Message>> {
    return this.repository.findOne({
      where,
      ...other,
    });
  }
}

const repository = AppDataSource.getRepository(Message);

export default new MessageRepository(repository);
