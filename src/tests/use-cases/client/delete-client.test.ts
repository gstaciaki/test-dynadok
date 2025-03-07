import { Client } from "../../../domain/entities/Client";
import { DeleteClientUseCase } from "../../../application/use-cases/client/delete-client";
import { MockClientRepository } from "./mocks/MockClientRepository";
import { MockCacheService } from "./mocks/MockCacheService";

describe("DeleteClientUseCase", () => {
  let deleteClientUseCase: DeleteClientUseCase;
  let clientRepository: MockClientRepository;
  let mockCacheService: MockCacheService;

  beforeEach(() => {
    clientRepository = new MockClientRepository();
    mockCacheService = new MockCacheService();
    deleteClientUseCase = new DeleteClientUseCase(
      clientRepository,
      mockCacheService
    );
  });

  it("should successfully delete a client", async () => {
    const client = new Client("John Doe", "john@example.com", "123456789");
    client.id = "1";
    await clientRepository.create(client);

    await deleteClientUseCase.performExecute(client.id);

    const deletedClient = await clientRepository.findOne(client.id);
    expect(deletedClient).toBeNull();
  });

  it("should throw an error if client does not exist", async () => {
    const nonExistentClientId = "non-existent-id";

    await expect(
      deleteClientUseCase.performExecute(nonExistentClientId)
    ).rejects.toThrow("Client not found");
  });

  it("should throw an error if ID is missing", async () => {
    await expect(deleteClientUseCase.performExecute("")).rejects.toThrow(
      "ID is required"
    );
  });
});
