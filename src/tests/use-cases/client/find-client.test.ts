import { FindClientUseCase } from "../../../application/use-cases/client/find-client";
import { MockCacheService } from "./mocks/MockCacheService";
import { MockClientRepository } from "./mocks/MockClientRepository";
import { Client } from "../../../domain/entities/Client";

describe("FindClientUseCase", () => {
  let findClientUseCase: FindClientUseCase;
  let clientRepository: MockClientRepository;
  let mockCacheService: MockCacheService;

  beforeEach(() => {
    clientRepository = new MockClientRepository();
    mockCacheService = new MockCacheService();
    findClientUseCase = new FindClientUseCase(
      clientRepository,
      mockCacheService
    );
  });

  it("should return a client from cache if available", async () => {
    const client = new Client("John Doe", "john@example.com", "123456789");
    client.id = "1";

    mockCacheService.getCache = jest.fn().mockResolvedValue(client);

    const result = await findClientUseCase.performExecute("1");

    expect(result).toEqual(client);
    expect(mockCacheService.getCache).toHaveBeenCalledWith("client:1");
  });

  it("should return null if client is not found in repository", async () => {
    mockCacheService.getCache = jest.fn().mockResolvedValue(null);

    clientRepository.findOne = jest.fn().mockResolvedValue(null);

    const result = await findClientUseCase.performExecute("1");

    expect(result).toBeNull();
  });

  it("should throw an error if ID is missing", async () => {
    await expect(findClientUseCase.performExecute("")).rejects.toThrow(
      "ID is required"
    );
  });
});
