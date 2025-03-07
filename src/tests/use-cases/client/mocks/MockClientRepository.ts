import { Client } from "../../../../domain/entities/Client";
import { IClientRepository } from "../../../../domain/repositories/IClientRepository";
import { ClientEntity } from "../../../../infrastructure/database/entities/client.entity";

export class MockClientRepository implements IClientRepository {
  private clients: Client[] = [];

  async findByEmail(email: string): Promise<Client | null> {
    return this.clients.find((client) => client.email === email) || null;
  }

  async create(client: Client): Promise<Client> {
    client.id = client.id ?? `${Math.floor(Math.random() * 1000)}`;
    this.clients.push(client);
    return client;
  }

  async findAll(): Promise<Client[]> {
    return this.clients;
  }

  async findOne(id: string): Promise<ClientEntity | null> {
    const client = this.clients.find((client) => client.id === id);
    return client ? new ClientEntity() : null;
  }

  async update(id: string, data: Partial<Client>): Promise<Client | null> {
    const clientIndex = this.clients.findIndex((client) => client.id === id);
    if (clientIndex === -1) return null;

    Object.assign(this.clients[clientIndex], data);
    const updatedClient = this.clients[clientIndex];

    return new Client(
      updatedClient.name,
      updatedClient.email,
      updatedClient.phone
    );
  }

  async delete(id: string): Promise<boolean> {
    const clientIndex = this.clients.findIndex((client) => client.id === id);
    if (clientIndex === -1) return false;

    this.clients.splice(clientIndex, 1);
    return true;
  }
}
