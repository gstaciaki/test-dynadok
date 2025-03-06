import { Client } from "../../../domain/entities/Client";
import { ClientRepository } from "../../../infrastructure/repositories/client.repository";
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
