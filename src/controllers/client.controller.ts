import { Request, Response } from "express";
import { ClientRepository } from "../repositories/client.repository";
import { CreateClientUseCase } from "../use-cases/client/create-client.use-case";
import { UpdateClientUseCase } from "../use-cases/client/update-client.use-case";
import { DeleteClientUseCase } from "../use-cases/client/delete-client.use-case";
import { ListClientsUseCase } from "../use-cases/client/list-clients.use-case";
import { FindClientUseCase } from "../use-cases/client/find-client.use-case";

export class ClientController {
  async index(req: Request, res: Response) {
    try {
      const clientRepository = new ClientRepository();
      const findAllClientsUseCase = new ListClientsUseCase(clientRepository);

      const clients = await findAllClientsUseCase.execute();
      return res.status(200).json(clients);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch clients" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, email, phone } = req.body;
      const clientRepository = new ClientRepository();
      const createClientUseCase = new CreateClientUseCase(clientRepository);

      const client = await createClientUseCase.execute({ name, email, phone });
      return res.status(201).json(client);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const clientRepository = new ClientRepository();
      const findClientByIdUseCase = new FindClientUseCase(clientRepository);

      const client = await findClientByIdUseCase.execute(id);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      return res.status(200).json(client);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, phone } = req.body;
      const clientRepository = new ClientRepository();
      const updateClientUseCase = new UpdateClientUseCase(clientRepository);

      const client = await updateClientUseCase.execute({
        id,
        name,
        email,
        phone,
      });
      return res.status(200).json(client);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const clientRepository = new ClientRepository();
      const deleteClientUseCase = new DeleteClientUseCase(clientRepository);

      await deleteClientUseCase.execute(id);
      return res.status(204).send(); // No content
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
