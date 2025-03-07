import { UpdateClientDTO } from "../../../application/dtos/client/UpdateClient.dto";
import { UpdateClientUseCase } from "../../../application/use-cases/client/update-client";
import { Client } from "../../../domain/entities/Client";
import { MockCacheService } from "./mocks/MockCacheService";
import { MockClientRepository } from "./mocks/MockClientRepository";

describe("UpdateClientUseCase", () => {
  let updateClientUseCase: UpdateClientUseCase;
  let clientRepository: MockClientRepository;
  let mockCacheService: MockCacheService;

  beforeEach(() => {
    clientRepository = new MockClientRepository();
    mockCacheService = new MockCacheService();
    mockCacheService.setCache = jest.fn();
    mockCacheService.clearCache = jest.fn();

    updateClientUseCase = new UpdateClientUseCase(
      clientRepository,
      mockCacheService
    );
  });

  it("should successfully update a client", async () => {
    const client = new Client("John Doe", "john@example.com", "123456789");
    client.id = "1";
    const createdClient = await clientRepository.create(client);

    const updateData: UpdateClientDTO = {
      id: createdClient.id,
      name: "Updated Name",
    };
    const updatedClient = await updateClientUseCase.performExecute(updateData);

    expect(updatedClient?.name).toBe("Updated Name");
  });

  it("should throw an error if client does not exist", async () => {
    const nonExistentClientId = "non-existent-id";
    const updateData: UpdateClientDTO = {
      id: nonExistentClientId,
      name: "Updated Name",
    };

    await expect(
      updateClientUseCase.performExecute(updateData)
    ).rejects.toThrow("Client not found");
  });

  it("should throw an error if email is already in use", async () => {
    const client = new Client("John Doe", "john@example.com", "123456789");
    client.id = "1";
    await clientRepository.create(client);

    const anotherClient = new Client(
      "Jane Doe",
      "jane@example.com",
      "987654321"
    );
    anotherClient.id = "2";
    await clientRepository.create(anotherClient);

    const updateData: UpdateClientDTO = { id: "1", email: "jane@example.com" };

    await expect(
      updateClientUseCase.performExecute(updateData)
    ).rejects.toThrow("Email already in use");
  });

  it("should update the cache after updating the client", async () => {
    const client = new Client("John Doe", "john@example.com", "123456789");
    client.id = "1";
    await clientRepository.create(client);

    const updateData: UpdateClientDTO = { id: "1", name: "Updated Name" };

    await updateClientUseCase.performExecute(updateData);

    expect(mockCacheService.setCache).toHaveBeenCalledWith(
      "client:1",
      expect.any(Client),
      600
    );

    expect(mockCacheService.clearCache).toHaveBeenCalledWith("clients");
  });

  it("should throw an error if ID is missing", async () => {
    const updateData: UpdateClientDTO = { id: "", name: "Updated Name" };

    await expect(
      updateClientUseCase.performExecute(updateData)
    ).rejects.toThrow("ID is required");
  });
});
