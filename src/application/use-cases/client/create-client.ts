import { Client } from "../../../domain/entities/Client";
import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { CreateClientDTO } from "../../dtos/client/CreateClient.dto";
import { BaseUseCase } from "../_base/use-case";

export class CreateClientUseCase extends BaseUseCase<CreateClientDTO, Client> {
  constructor(private clientRepository: IClientRepository) {
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

    const client = new Client(data.name, data.email, data.phone);
    const createdClient = await this.clientRepository.create(client);
    return Object.assign(client, createdClient);
  }
}
