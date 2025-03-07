import { Client } from "../../../domain/entities/Client";
import { ClientRepository } from "../../../infrastructure/repositories/client.repository";
import { CacheService } from "../../../services/CacheService";
import { BaseUseCase } from "../_base/use-case";

export class ListClientsUseCase extends BaseUseCase<void, Client[]> {
  constructor(
    private clientRepository: ClientRepository,
    private cacheService: CacheService
  ) {
    super();
  }

  protected validate(): void {}

  protected async execute(): Promise<Client[]> {
    const cacheKey = "clients";

    const cachedClients = await this.cacheService.getCache<Client[]>(cacheKey);
    if (cachedClients) {
      console.log("Retornando lista de clientes do cache");
      return cachedClients;
    }

    const clients = await this.clientRepository.findAll();

    await this.cacheService.setCache(cacheKey, clients, 600);

    return clients;
  }
}
