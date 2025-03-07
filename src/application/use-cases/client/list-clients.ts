import { Client } from "../../../domain/entities/Client";
import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { CacheService } from "../../../services/CacheService";
import { ClientEntity } from "../../../infrastructure/database/entities/client.entity";
import { BaseUseCase } from "../_base/use-case";

export class ListClientsUseCase extends BaseUseCase<void, Client[]> {
  constructor(
    private clientRepository: IClientRepository,
    private cacheService: CacheService
  ) {
    super();
  }

  protected validate(): void {}

  protected async execute(): Promise<Client[]> {
    const cacheKey = "clients";

    const cachedClients = await this.cacheService.getCache<Client[]>(cacheKey);
    if (cachedClients) {
      return cachedClients;
    }

    const clientEntities: ClientEntity[] =
      await this.clientRepository.findAll();

    const clients: Client[] = clientEntities.map((clientEntity) => {
      const client = new Client("", "", "");

      return Object.assign(client, clientEntity);
    });

    await this.cacheService.setCache(cacheKey, clients, 600);

    return clients;
  }
}
