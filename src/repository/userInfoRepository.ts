import { Repository, UpdateResult } from 'typeorm';
import UserInfo from '../entities/UserInfo';
import AppDataSource from '../lib/DataSource';
import { UserInfoInput } from '../types/InputType';
import { OderOption, RelationsOption, SelectOption, WhereOption } from '../types/RepositoryFindOptions';

class UserInfoRepository {
  constructor(private repository: Repository<UserInfo>) {}

  async create(data: UserInfoInput): Promise<UserInfo> {
    return await this.repository.save(data);
  }

  async insert(data: UserInfoInput) {
    return this.repository.createQueryBuilder().insert().values(data).returning('*').execute();
  }

  async findById(id: string): Promise<UserInfo | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findOne(
    where?: WhereOption<UserInfo>,
    options?: {
      relations?: RelationsOption<UserInfo>;
      select?: SelectOption<UserInfo>;
    }
  ): Promise<UserInfo | null> {
    return await this.repository.findOne({
      where,
      ...options,
    });
  }

  async find(
    where?: WhereOption<UserInfo>,
    options?: {
      relations?: RelationsOption<UserInfo>;
      select?: SelectOption<UserInfo>;
      order?: OderOption<UserInfo>;
    }
  ): Promise<UserInfo[]> {
    return this.repository.find({
      where,
      ...options,
    });
  }

  async updateById(id: string, user: UserInfoInput): Promise<UpdateResult> {
    return await this.repository
      .createQueryBuilder()
      .update()
      .set(user)
      .where('id = :id', { id })
      .returning('*')
      .execute();
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

const repository = AppDataSource.getRepository(UserInfo);

export default new UserInfoRepository(repository);
