import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/User';
import AppDataSource from '../lib/DataSource';
import {
  OderOption,
  PartialEntity,
  QueryOption,
  RelationsOption,
  SelectOption,
  WhereOption,
} from '../types/RepositoryFindOptions';
import { RegisterInput } from '../types/InputType';

class UserRepository {
  constructor(private repository: Repository<User>) {}

  async create(data: RegisterInput): Promise<User> {
    return this.repository.save(data);
  }

  async findOne(
    where: WhereOption<User>,
    options?: {
      relations?: RelationsOption<User>;
      select?: SelectOption<User>;
    }
  ): Promise<User | null> {
    return await this.repository.findOne({
      where,
      ...options,
    });
  }

  async find(
    where?: WhereOption<User>,
    options?: {
      relations?: RelationsOption<User>;
      select?: SelectOption<User>;
      order?: OderOption<User>;
    }
  ): Promise<User[]> {
    return this.repository.find({
      where,
      ...options,
    });
  }
  async update(query: QueryOption<User>, partial: PartialEntity<User>): Promise<UpdateResult> {
    return this.repository.update(query, partial);
  }
}

const repository = AppDataSource.getRepository(User);

export default new UserRepository(repository);
