import { Client } from "../../../domain/entities/Client";
import { ClientRepository } from "../../../infrastructure/repositories/client.repository";
import { UpdateClientDTO } from "../../dtos/client/UpdateClient.dto";
import { BaseUseCase } from "../_base/use-case";

export class UpdateClientUseCase extends BaseUseCase<
  UpdateClientDTO,
  Client | null
> {
  constructor(private clientRepository: ClientRepository) {
    super();
  }

  protected validate(data: UpdateClientDTO): void {
    if (!data.id) throw new Error("ID is required");
    if (!data.name && !data.email && !data.phone) {
      throw new Error("At least one field must be updated");
    }
  }

  protected async execute(data: UpdateClientDTO): Promise<Client | null> {
    const clientData = await this.clientRepository.findOne(data.id);
    if (!clientData) throw new Error("Client not found");

    const client = new Client(
      clientData.name,
      clientData.email,
      clientData.phone
    );

    const updatedData: Partial<Client> = {};
    if (data.name) client.changeName(data.name);
    if (data.email) {
      const emailInUse = await this.clientRepository.findByEmail(data.email);
      if (emailInUse) throw new Error("Email already in use");
      client.changeEmail(data.email);
    }
    if (data.phone) client.chagePhone(data.phone);

    return this.clientRepository.update(data.id, updatedData);
  }
}
