import { ClientRepository } from "../../repositories/client.repository";
import { Client } from "../../entities/client.entity";

export class ListClientsUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute(): Promise<Client[]> {
    const clients = await this.clientRepository.findAll();
    return clients;
  }
}
