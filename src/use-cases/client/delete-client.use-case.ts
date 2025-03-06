import { ClientRepository } from "../../repositories/client.repository";

export class DeleteClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute(id: string): Promise<void> {
    const client = await this.clientRepository.findOne(id);

    if (!client) {
      throw new Error("Client not found");
    }

    await this.clientRepository.delete(id);
  }
}
