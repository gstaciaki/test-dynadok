import { RedisClient } from "../../../../infrastructure/cache/RedisClients";
import { CacheService } from "../../../../services/CacheService";

export class MockCacheService extends CacheService {
  private cache: Record<string, any> = {};

  constructor() {
    const redis: RedisClient = new RedisClient();
    super(redis);
  }

  async getCache<T>(key: string): Promise<T | null> {
    return this.cache[key] || null;
  }

  async setCache<T>(key: string, value: T, ttl: number): Promise<void> {
    this.cache[key] = value;
  }
}
