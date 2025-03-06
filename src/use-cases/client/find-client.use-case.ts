import { ClientRepository } from "../../repositories/client.repository";
import { Client } from "../../entities/client.entity";
import { BaseUseCase } from "../_base/use-case";

export class FindClientUseCase extends BaseUseCase<string, Client | null> {
  constructor(private clientRepository: ClientRepository) {
    super();
  }

  protected validate(id: string): void {
    if (!id) throw new Error("ID is required");
  }

  protected async execute(id: string): Promise<Client | null> {
    return this.clientRepository.findOne(id);
  }
}
