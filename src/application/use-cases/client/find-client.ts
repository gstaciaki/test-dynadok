import { Client } from "../../../domain/entities/Client";
import { ClientRepository } from "../../../infrastructure/repositories/client.repository";
import { BaseUseCase } from "../_base/use-case";

export class FindClientUseCase extends BaseUseCase<string, Client | null> {
  constructor(private clientRepository: ClientRepository) {
    super();
  }

  protected validate(id: string): void {
    if (!id) throw new Error("ID is required");
  }

  protected async execute(id: string): Promise<Client | null> {
    const a = await this.clientRepository.findOne(id);
    console.log(a);

    return this.clientRepository.findOne(id);
  }
}
