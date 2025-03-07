import { CreateClientDTO } from "../../../application/dtos/client/CreateClient.dto";
import { CreateClientUseCase } from "../../../application/use-cases/client/create-client";
import { MockClientRepository } from "./mocks/MockClientRepository";

const mockPublishEvent = jest.fn();

describe("CreateClientUseCase", () => {
  let createClientUseCase: CreateClientUseCase;
  let clientRepository: MockClientRepository;

  beforeEach(() => {
    clientRepository = new MockClientRepository();
    createClientUseCase = new CreateClientUseCase(clientRepository);
    createClientUseCase["publishEvent"] = mockPublishEvent;
  });

  it("should successfully create a client", async () => {
    const clientData: CreateClientDTO = {
      name: "John Doe",
      email: "john@example.com",
      phone: "123456789",
    };

    const createdClient = await createClientUseCase.performExecute(clientData);

    expect(createdClient).toHaveProperty("id");
    expect(createdClient.name).toBe(clientData.name);
    expect(createdClient.email).toBe(clientData.email);
    expect(createdClient.phone).toBe(clientData.phone);

    expect(mockPublishEvent).toHaveBeenCalledWith({
      type: "client-created",
      payload: createdClient,
    });
  });

  it("should throw an error if client already exists", async () => {
    const clientData: CreateClientDTO = {
      name: "John Doe",
      email: "john@example.com",
      phone: "123456789",
    };

    await createClientUseCase.performExecute(clientData);

    await expect(
      createClientUseCase.performExecute(clientData)
    ).rejects.toThrow("Client already exists");
  });

  it("should throw an error if name is missing", async () => {
    const clientData: CreateClientDTO = {
      name: "",
      email: "john@example.com",
      phone: "123456789",
    };

    await expect(
      createClientUseCase.performExecute(clientData)
    ).rejects.toThrow("Name is required");
  });

  it("should throw an error if email is invalid", async () => {
    const clientData: CreateClientDTO = {
      name: "John Doe",
      email: "invalid-email",
      phone: "123456789",
    };

    await expect(
      createClientUseCase.performExecute(clientData)
    ).rejects.toThrow("Email is invalid");
  });

  it("should throw an error if phone is missing", async () => {
    const clientData: CreateClientDTO = {
      name: "John Doe",
      email: "john@example.com",
      phone: "",
    };

    await expect(
      createClientUseCase.performExecute(clientData)
    ).rejects.toThrow("Phone is required");
  });
});
