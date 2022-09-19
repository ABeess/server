import { FindManyOptions, Repository } from 'typeorm';
import { UserRoom } from '../entities/UserRoom';
import AppDataSource from '../lib/DataSource';

class UserRoomRepository {
  constructor(private repository: Repository<UserRoom>) {}

  async create(data: Partial<UserRoom>) {
    return await this.repository.save(data);
  }

  async find({ where, ...other }: FindManyOptions<UserRoom>) {
    return await this.repository.find({
      where,
      ...other,
    });
  }
}

const repository = AppDataSource.getRepository(UserRoom);

export default new UserRoomRepository(repository);
