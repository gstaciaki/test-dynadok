import { RedisClient } from "../infrastructure/cache/RedisClients";

export class CacheService {
  private redisClient: RedisClient;

  constructor(redisClient: RedisClient) {
    this.redisClient = redisClient;
  }

  async getCache<T>(key: string): Promise<T | null> {
    const cachedData = await this.redisClient.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  async setCache<T>(key: string, data: T, ttl: number = 600): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(data), ttl);
  }

  async clearCache(key: string): Promise<void> {
    await this.redisClient.delete(key);
  }
}
