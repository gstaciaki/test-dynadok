import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { CacheService } from "../../../services/CacheService";
import { BaseUseCase } from "../_base/use-case";

export class DeleteClientUseCase extends BaseUseCase<string, void> {
  constructor(
    private clientRepository: IClientRepository,
    private cacheService: CacheService
  ) {
    super();
  }

  protected validate(id: string): void {
    if (!id) throw new Error("ID is required");
  }

  protected async execute(id: string): Promise<void> {
    const client = await this.clientRepository.findOne(id);
    if (!client) throw new Error("Client not found");

    await this.clientRepository.delete(id);

    const cacheKey = `client:${id}`;
    await this.cacheService.clearCache(cacheKey);

    const cacheListKey = "clients";
    await this.cacheService.clearCache(cacheListKey);
  }
}
