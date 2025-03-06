import { Request, Response } from "express";
import { ClientRepository } from "../repositories/client.repository";
import { CreateClientUseCase } from "../use-cases/client/create-client.use-case";
import { UpdateClientUseCase } from "../use-cases/client/update-client.use-case";
import { DeleteClientUseCase } from "../use-cases/client/delete-client.use-case";
import { ListClientsUseCase } from "../use-cases/client/list-clients.use-case";
import { FindClientUseCase } from "../use-cases/client/find-client.use-case";
import { BaseController } from "./_base/controller";

export class ClientController extends BaseController {
  private clientRepository: ClientRepository;

  constructor() {
    super();
    this.clientRepository = new ClientRepository();
  }

  async index(req: Request, res: Response) {
    try {
      const findAllClientsUseCase = new ListClientsUseCase(
        this.clientRepository
      );
      const clients = await findAllClientsUseCase.performExecute();
      this.ok(req, res, clients);
    } catch (error) {
      this.internalServerError(req, res, error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, email, phone } = req.body;
      const createClientUseCase = new CreateClientUseCase(
        this.clientRepository
      );

      const client = await createClientUseCase.performExecute({
        name,
        email,
        phone,
      });
      this.created(req, res, client);
    } catch (error) {
      this.badRequest(req, res, error);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const findClientByIdUseCase = new FindClientUseCase(
        this.clientRepository
      );

      const client = await findClientByIdUseCase.performExecute(id);
      if (!client) {
        return this.notFound(req, res, new Error("Client not found"));
      }

      this.ok(req, res, client);
    } catch (error) {
      this.internalServerError(req, res, error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, phone } = req.body;
      const updateClientUseCase = new UpdateClientUseCase(
        this.clientRepository
      );

      const client = await updateClientUseCase.performExecute({
        id,
        name,
        email,
        phone,
      });
      this.ok(req, res, client);
    } catch (error) {
      this.badRequest(req, res, error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleteClientUseCase = new DeleteClientUseCase(
        this.clientRepository
      );

      await deleteClientUseCase.performExecute(id);
      this.noContent(req, res);
    } catch (error) {
      this.badRequest(req, res, error);
    }
  }
}
