import { ClientRepository } from "../../repositories/client.repository";
import { Client } from "../../entities/client.entity";
import { BaseUseCase } from "../_base/use-case";

export class ListClientsUseCase extends BaseUseCase<void, Client[]> {
  constructor(private clientRepository: ClientRepository) {
    super();
  }

  protected validate(): void {}

  protected async execute(): Promise<Client[]> {
    return this.clientRepository.findAll();
  }
}
