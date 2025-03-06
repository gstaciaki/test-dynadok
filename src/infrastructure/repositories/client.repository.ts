import { Client } from "../../domain/entities/Client";
import { IClientRepository } from "../../domain/repositories/IClientRepository";
import { ClientEntity } from "../database/entities/client.entity";
import { BaseRepository } from "./_base/repository";

export class ClientRepository
  extends BaseRepository<Client>
  implements IClientRepository
{
  constructor() {
    super(ClientEntity);
  }

  async findByEmail(email: string): Promise<Client | null> {
    return this.repository.findOne({ where: { email } });
  }
}
