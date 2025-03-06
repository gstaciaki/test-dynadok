import { ClientRepository } from "../../../infrastructure/repositories/client.repository";
import { BaseUseCase } from "../_base/use-case";

export class DeleteClientUseCase extends BaseUseCase<string, void> {
  constructor(private clientRepository: ClientRepository) {
    super();
  }

  protected validate(id: string): void {
    if (!id) throw new Error("ID is required");
  }

  protected async execute(id: string): Promise<void> {
    const client = await this.clientRepository.findOne(id);
    if (!client) throw new Error("Client not found");

    await this.clientRepository.delete(id);
  }
}
