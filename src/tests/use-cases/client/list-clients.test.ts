import { ListClientsUseCase } from "../../../application/use-cases/client/list-clients";
import { Client } from "../../../domain/entities/Client";
import { MockCacheService } from "./mocks/MockCacheService";
import { MockClientRepository } from "./mocks/MockClientRepository";

describe("ListClientsUseCase", () => {
  let listClientsUseCase: ListClientsUseCase;
  let mockClientRepository: MockClientRepository;
  let mockCacheService: MockCacheService;

  beforeEach(() => {
    mockClientRepository = new MockClientRepository();
    mockCacheService = new MockCacheService();
    listClientsUseCase = new ListClientsUseCase(
      mockClientRepository,
      mockCacheService
    );
  });

  it("should return clients from repository if not in cache", async () => {
    const client1 = new Client("John Doe", "john@example.com", "123456789");
    const client2 = new Client("Jane Doe", "jane@example.com", "987654321");

    mockClientRepository.create(client1);
    mockClientRepository.create(client2);

    const clients = await listClientsUseCase.performExecute();

    expect(clients).toHaveLength(2);
    expect(clients[0].name).toBe("John Doe");
    expect(clients[1].name).toBe("Jane Doe");

    const cachedClients = await mockCacheService.getCache<Client[]>("clients");
    expect(cachedClients).toHaveLength(2);
  });

  it("should return clients from cache if available", async () => {
    const client1 = new Client("John Doe", "john@example.com", "123456789");
    const client2 = new Client("Jane Doe", "jane@example.com", "987654321");

    mockCacheService.setCache("clients", [client1, client2], 600);

    const clients = await listClientsUseCase.performExecute();

    expect(clients).toHaveLength(2);
    expect(clients[0].name).toBe("John Doe");
    expect(clients[1].name).toBe("Jane Doe");

    const spy = jest.spyOn(mockClientRepository, "findAll");
    expect(spy).not.toHaveBeenCalled();
  });

  it("should store clients in cache after retrieving from repository", async () => {
    const client1 = new Client("John Doe", "john@example.com", "123456789");
    const client2 = new Client("Jane Doe", "jane@example.com", "987654321");

    mockClientRepository.create(client1);
    mockClientRepository.create(client2);

    const clients = await listClientsUseCase.performExecute();

    const cachedClients = await mockCacheService.getCache<Client[]>("clients");
    expect(cachedClients).toHaveLength(2);
    expect(cachedClients[0].name).toBe("John Doe");
    expect(cachedClients[1].name).toBe("Jane Doe");
  });
});
