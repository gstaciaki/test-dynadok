import { ClientRepository } from "../../repositories/client.repository";
import { Client } from "../../entities/client.entity";

interface IUpdateClientDTO {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
}

export class UpdateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    id,
    name,
    email,
    phone,
  }: IUpdateClientDTO): Promise<Client | null> {
    const client = await this.clientRepository.findOne(id);
    if (!client) {
      throw new Error("Client not found");
    }

    const updatedData: any = {};

    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (phone) updatedData.phone = phone;

    return await this.clientRepository.update(id, updatedData);
  }
}
