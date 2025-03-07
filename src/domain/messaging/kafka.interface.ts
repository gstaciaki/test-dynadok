export interface KafkaProducer {
  produce(topic: string, message: any): Promise<void>;
}

export interface KafkaConsumer {
  consume(
    topic: string,
    groupId: string,
    callback: (message: any) => void
  ): Promise<void>;
}

export interface KafkaPublisher {
  publish(event: IEvent);
  connect();
  disconnect();
}

export interface IEvent {
  type: string;
  payload: any;
}
