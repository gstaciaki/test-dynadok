import request from "supertest";
import express from "express";
import { CreateClientUseCase } from "../../application/use-cases/client/create-client";
import { UpdateClientUseCase } from "../../application/use-cases/client/update-client";
import { DeleteClientUseCase } from "../../application/use-cases/client/delete-client";
import { ListClientsUseCase } from "../../application/use-cases/client/list-clients";
import { FindClientUseCase } from "../../application/use-cases/client/find-client";
import { ClientController } from "../../interfaces/controllers/client.controller";

jest.mock("../../application/use-cases/client/create-client");
jest.mock("../../application/use-cases/client/update-client");
jest.mock("../../application/use-cases/client/delete-client");
jest.mock("../../application/use-cases/client/list-clients");
jest.mock("../../application/use-cases/client/find-client");

describe("ClientController", () => {
  let app: express.Express;
  let clientController: ClientController;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    clientController = new ClientController();

    app.get("/clients", (req, res) => clientController.index(req, res));
    app.post("/clients", (req, res) => clientController.create(req, res));
    app.get("/clients/:id", (req, res) => clientController.show(req, res));
    app.put("/clients/:id", (req, res) => clientController.update(req, res));
    app.delete("/clients/:id", (req, res) => clientController.delete(req, res));
  });

  it("should return a list of clients (index)", async () => {
    const mockClients = [{ id: 1, name: "Client 1" }];
    (ListClientsUseCase as jest.Mock).mockImplementation(() => ({
      performExecute: jest.fn().mockResolvedValue(mockClients),
    }));

    const response = await request(app).get("/clients");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockClients);
  });

  it("should create a new client (create)", async () => {
    const mockClient = {
      id: 1,
      name: "New Client",
      email: "client@example.com",
      phone: "1234567890",
    };
    (CreateClientUseCase as jest.Mock).mockImplementation(() => ({
      performExecute: jest.fn().mockResolvedValue(mockClient),
    }));

    const response = await request(app).post("/clients").send({
      name: "New Client",
      email: "client@example.com",
      phone: "1234567890",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockClient);
  });

  it("should return a single client (show)", async () => {
    const mockClient = {
      id: 1,
      name: "Client 1",
      email: "client1@example.com",
      phone: "1234567890",
    };
    (FindClientUseCase as jest.Mock).mockImplementation(() => ({
      performExecute: jest.fn().mockResolvedValue(mockClient),
    }));

    const response = await request(app).get("/clients/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockClient);
  });

  it("should return 404 when client not found (show)", async () => {
    (FindClientUseCase as jest.Mock).mockImplementation(() => ({
      performExecute: jest.fn().mockResolvedValue(null),
    }));

    const response = await request(app).get("/clients/999");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Client not found");
  });

  it("should update a client (update)", async () => {
    const mockUpdatedClient = {
      id: 1,
      name: "Updated Client",
      email: "updated@example.com",
      phone: "9876543210",
    };
    (UpdateClientUseCase as jest.Mock).mockImplementation(() => ({
      performExecute: jest.fn().mockResolvedValue(mockUpdatedClient),
    }));

    const response = await request(app).put("/clients/1").send({
      name: "Updated Client",
      email: "updated@example.com",
      phone: "9876543210",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUpdatedClient);
  });

  it("should delete a client (delete)", async () => {
    (DeleteClientUseCase as jest.Mock).mockImplementation(() => ({
      performExecute: jest.fn().mockResolvedValue(undefined),
    }));

    const response = await request(app).delete("/clients/1");
    expect(response.status).toBe(204);
  });

  it("should return 400 for invalid client data (create)", async () => {
    (CreateClientUseCase as jest.Mock).mockImplementation(() => ({
      performExecute: jest.fn().mockRejectedValue(new Error("Invalid data")),
    }));

    const response = await request(app)
      .post("/clients")
      .send({ name: "Invalid Client" });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid data");
  });
});
