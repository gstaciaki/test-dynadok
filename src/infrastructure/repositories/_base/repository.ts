import { Repository, EntityTarget, DeepPartial } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { AppDataSource } from "../../database/data-source";

export class BaseRepository<T> {
  protected repository: Repository<T>;

  constructor(entity: EntityTarget<T>) {
    this.repository = AppDataSource.getRepository(entity);
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async findOne(id: string): Promise<T | null> {
    return this.repository.findOne(id as any);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async update(id: string, data: QueryDeepPartialEntity<T>): Promise<T> {
    await this.repository.update(id, data);
    return this.findOne(id) as Promise<T>;
  }

  async delete(id: string): Promise<boolean> {
    await this.repository.delete(id);
    return true;
  }
}
