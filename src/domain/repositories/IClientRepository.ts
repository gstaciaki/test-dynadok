import { ClientEntity } from "../../infrastructure/database/entities/client.entity";
import { Client } from "../entities/Client";
import { IBaseRepository } from "./_base/IBaseRepository";

export interface IClientRepository extends IBaseRepository<ClientEntity> {
  findByEmail(email: string): Promise<ClientEntity | null>;
}
