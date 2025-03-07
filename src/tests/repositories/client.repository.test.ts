import { ClientRepository } from "../../infrastructure/repositories/client.repository";
import { initializeTestDB, stopTestDB } from "../test-utils";

describe("ClientRepository", () => {
  let clientRepository: ClientRepository;

  beforeAll(async () => {
    await initializeTestDB();
    clientRepository = new ClientRepository();
  });

  afterAll(async () => {
    await stopTestDB();
  });

  it("should create a new client", async () => {
    const clientData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "123456789",
    };

    const client = await clientRepository.create(clientData);

    expect(client).toHaveProperty("id");
    expect(client).toHaveProperty("createdAt");
    expect(client).toHaveProperty("updatedAt");
    expect(client.name).toBe(clientData.name);
    expect(client.email).toBe(clientData.email);
  });

  it("should find a client by id", async () => {
    const clientData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "123456789",
    };
    const client = await clientRepository.create(clientData);

    const foundClient = await clientRepository.findOne(client.id);

    expect(foundClient).toBeTruthy();
  });

  it("should update a client", async () => {
    const clientData = {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "987654321",
    };
    const client = await clientRepository.create(clientData);

    const updatedData = { name: "Jane Smith" };
    const updatedClient = await clientRepository.update(client.id, updatedData);

    expect(updatedClient.name).toBe(updatedData.name);
    expect(updatedClient.email).toBe(client.email);
  });

  it("should delete a client", async () => {
    const clientData = {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "987654321",
    };
    const client = await clientRepository.create(clientData);

    await clientRepository.delete(client.id);

    const deletedClient = await clientRepository.findOne(client.id);
    expect(deletedClient).toBeNull();
  });

  it("should find a client by email", async () => {
    const clientData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "123456789",
    };
    const client = await clientRepository.create(clientData);

    const foundClient = await clientRepository.findByEmail(client.email);

    expect(foundClient).toBeTruthy();
    expect(foundClient?.email).toBe(client.email);
  });

  it("should return null if client is not found by email", async () => {
    const foundClient = await clientRepository.findByEmail(
      "nonexistent@example.com"
    );

    expect(foundClient).toBeNull();
  });
});
