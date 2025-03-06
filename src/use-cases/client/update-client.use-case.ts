import { ClientRepository } from "../../repositories/client.repository";
import { Client } from "../../entities/client.entity";
import { BaseUseCase } from "../_base/use-case";

interface IUpdateClientDTO {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
}

export class UpdateClientUseCase extends BaseUseCase<
  IUpdateClientDTO,
  Client | null
> {
  constructor(private clientRepository: ClientRepository) {
    super();
  }

  protected validate(data: IUpdateClientDTO): void {
    if (!data.id) throw new Error("ID is required");
    if (!data.name && !data.email && !data.phone) {
      throw new Error("At least one field must be updated");
    }
  }

  protected async execute(data: IUpdateClientDTO): Promise<Client | null> {
    const client = await this.clientRepository.findOne(data.id);
    if (!client) throw new Error("Client not found");

    const updatedData: Partial<Client> = {};
    if (data.name) updatedData.name = data.name;
    if (data.email) {
      const emailInUse = await this.clientRepository.findByEmail(data.email);
      if (emailInUse) throw new Error("Email already ind use");
      updatedData.email = data.email;
    }
    if (data.phone) updatedData.phone = data.phone;

    return this.clientRepository.update(data.id, updatedData);
  }
}
