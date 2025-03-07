import { Client } from "../../../domain/entities/Client";
import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { UpdateClientDTO } from "../../dtos/client/UpdateClient.dto";
import { CacheService } from "../../../services/CacheService";
import { BaseUseCase } from "../_base/use-case";

export class UpdateClientUseCase extends BaseUseCase<
  UpdateClientDTO,
  Client | null
> {
  constructor(
    private clientRepository: IClientRepository,
    private cacheService: CacheService
  ) {
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

    await this.clientRepository.update(data.id, updatedData);

    const cacheKey = `client:${data.id}`;
    await this.cacheService.setCache(cacheKey, client, 600);

    const clientsCacheKey = "clients";
    await this.cacheService.clearCache(clientsCacheKey);

    return client;
  }
}
