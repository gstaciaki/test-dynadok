import { Redis } from "ioredis";

export class RedisClient {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || "redis",
      port: Number(process.env.REDIS_PORT) || 6379,
    });

    this.client.on("connect", () => {});

    this.client.on("error", (err) => {
      console.error("Erro no Redis:", err);
    });
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttl: number): Promise<void> {
    await this.client.set(key, value, "EX", ttl);
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}
