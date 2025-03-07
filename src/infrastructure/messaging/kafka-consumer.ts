import { Kafka } from "kafkajs";
import { KafkaConsumer } from "../../domain/messaging/kafka.interface";

export class KafkaConsumerService implements KafkaConsumer {
  private kafka;
  private consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: `${process.env.KAFKA_CLIENT_ID}`,
      brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
    });
  }

  async consume(
    topic: string,
    groupId: string,
    callback: (message: any) => void
  ): Promise<void> {
    this.consumer = this.kafka.consumer({ groupId });

    await this.consumer.connect();
    await this.consumer.subscribe({ topic, fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        if (message.value) {
          const parsedMessage = JSON.parse(message.value.toString());
          callback(parsedMessage);
        }
      },
    });
  }

  async disconnect() {
    await this.consumer.disconnect();
  }
}
