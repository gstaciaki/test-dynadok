import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface IBaseRepository<T> {
  create(data: T): Promise<T>;
  findOne(id: string): Promise<T | null>;
  update(id: string, data: QueryDeepPartialEntity<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}
