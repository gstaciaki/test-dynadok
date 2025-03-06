import { ClientRepository } from "../../repositories/client.repository";
import { Client } from "../../entities/client.entity";

export class FindClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute(id: string): Promise<Client | null> {
    const client = await this.clientRepository.findOne(id);

    return client;
  }
}
