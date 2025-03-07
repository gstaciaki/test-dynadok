import { KafkaConsumerService } from "./kafka-consumer";

export async function setupKafkaConsumer(): Promise<void> {
  try {
    const consumerService = new KafkaConsumerService();

    const handleMessage = (message: any) => {
      console.log("Mensagem recebida do Kafka:", message);
    };

    await consumerService.consume("client-created", "my-group", handleMessage);
  } catch (error) {
    console.error("Erro ao iniciar o consumidor Kafka:", error);
  }
}
