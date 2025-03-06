import { Client } from "../entities/client.entity";
import { BaseRepository } from "./_base/repository";

export class ClientRepository extends BaseRepository<Client> {
  constructor() {
    super(Client);
  }
}
