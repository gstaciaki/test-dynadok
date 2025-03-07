import { Client } from "../../../domain/entities/Client";
import { ClientRepository } from "../../../infrastructure/repositories/client.repository";
import { CacheService } from "../../../services/CacheService";
import { BaseUseCase } from "../_base/use-case";

export class FindClientUseCase extends BaseUseCase<string, Client | null> {
  constructor(
    private clientRepository: ClientRepository,
    private cacheService: CacheService
  ) {
    super();
  }

  protected validate(id: string): void {
    if (!id) throw new Error("ID is required");
  }

  protected async execute(id: string): Promise<Client | null> {
    const cacheKey = `client:${id}`;

    const cachedClient = await this.cacheService.getCache<Client>(cacheKey);
    if (cachedClient) {
      console.log(`Cliente ${id} retornado do cache`);
      return cachedClient;
    }

    const client = await this.clientRepository.findOne(id);
    if (!client) return null;

    await this.cacheService.setCache(cacheKey, client, 600);

    return client;
  }
}
