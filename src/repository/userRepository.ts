import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/User';
import AppDataSource from '../lib/DataSource';
import { Nullable } from '../types';
import { RegisterInput } from '../types/InputType';
import { PartialEntity, QueryOption } from '../types/RepositoryFindOptions';

class UserRepository {
  constructor(private repository: Repository<User>) {}

  async create(data: RegisterInput): Promise<User> {
    return this.repository.save(data);
  }

  async findOne({ where, ...other }: FindOneOptions<User>): Promise<Nullable<User>> {
    return await this.repository.findOne({
      where,
      ...other,
    });
  }

  async findOneBy({ ...other }: FindOptionsWhere<User>) {
    return await this.repository.findOneBy(other);
  }

  async find({ where, ...other }: FindManyOptions<User>): Promise<User[]> {
    return this.repository.find({
      where,
      ...other,
    });
  }

  async update(query: QueryOption<User>, partial: PartialEntity<User>): Promise<UpdateResult> {
    return this.repository.update(query, partial);
  }

  createQueryBuilder() {
    return this.repository.createQueryBuilder();
  }
}

const repository = AppDataSource.getRepository(User);

export default new UserRepository(repository);
