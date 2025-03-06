import { Client } from "../entities/client.entity";
import { BaseRepository } from "./_base/repository";

export class ClientRepository extends BaseRepository<Client> {
  constructor() {
    super(Client);
  }

  async findByEmail(email: string): Promise<Client | null> {
    return this.repository.findOne({ where: { email } });
  }
}
