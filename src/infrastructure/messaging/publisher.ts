import { IEvent, KafkaPublisher } from "../../domain/messaging/kafka.interface";
import { KafkaProducerService } from "./kafka-producer";

export class Publisher implements KafkaPublisher {
  private producerService: KafkaProducerService;

  constructor() {
    this.producerService = new KafkaProducerService();
  }

  async connect() {
    await this.producerService.connect();
  }

  async publish(event: IEvent) {
    try {
      const { type, payload } = event;

      await this.producerService.produce(type, payload);

      console.log(`Evento "${type}" publicado com sucesso.`);
    } catch (error) {
      console.error("Erro ao publicar evento:", error);
      throw error;
    }
  }

  async disconnect() {
    await this.producerService.disconnect();
  }
}
