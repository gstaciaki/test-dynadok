import { Client } from "../../entities/client.entity";
import { ClientRepository } from "../../repositories/client.repository";
import { BaseUseCase } from "../_base/use-case";

interface CreateClientDTO {
  name: string;
  email: string;
  phone: string;
}

export class CreateClientUseCase extends BaseUseCase<CreateClientDTO, Client> {
  constructor(private clientRepository: ClientRepository) {
    super();
  }

  protected validate(data: CreateClientDTO): void {
    if (!data.name) throw new Error("Name is required");
    if (!data.email) throw new Error("Email is required");
    if (!data.email.includes("@")) throw new Error("Email is invalid");
    if (!data.phone) throw new Error("Phone is required");
  }

  protected async execute(data: CreateClientDTO): Promise<Client> {
    const clientExists = await this.clientRepository.findByEmail(data.email);
    if (clientExists) throw new Error("Client already exists");

    const client = new Client();
    Object.assign(client, data);
    return this.clientRepository.create(client);
  }
}
