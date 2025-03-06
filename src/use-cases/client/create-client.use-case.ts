import { Client } from "../../entities/client.entity";
import { ClientRepository } from "../../repositories/client.repository";

interface CreateClientDTO {
  name: string;
  email: string;
  phone: string;
}

export class CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute(data: CreateClientDTO): Promise<Client> {
    const clientExists = await this.clientRepository.findByEmail(data.email);    
    if (clientExists) throw new Error("Client already exists");

    const client = new Client();
    Object.assign(client, data);
    return this.clientRepository.create(client);
  }
}
