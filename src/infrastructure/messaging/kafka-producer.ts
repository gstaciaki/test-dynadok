import { Kafka } from "kafkajs";
import { KafkaProducer } from "../../domain/messaging/kafka.interface";

export class KafkaProducerService implements KafkaProducer {
  private kafka: Kafka;
  private producer: any;

  constructor() {
    this.kafka = new Kafka({
      clientId: `${process.env.KAFKA_CLIENT_ID}`,
      brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
    });

    this.producer = this.kafka.producer();
  }

  async connect() {
    await this.producer.connect();
  }

  async produce(topic: string, message: any): Promise<void> {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log(`Mensagem enviada para ${topic}:`, message);
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}
