import { IEvent } from "../../../domain/messaging/kafka.interface";
import { Publisher } from "../../../infrastructure/messaging/publisher";

export abstract class BaseUseCase<Input, Output> {
  private readonly _eventPublisher: Publisher;
  constructor() {
    this._eventPublisher = new Publisher();
  }

  protected abstract validate(data: Input): void;

  public async performExecute(data: Input): Promise<Output> {
    this.validate(data);
    return this.execute(data);
  }

  protected abstract execute(data: Input): Promise<Output>;

  protected async publishEvent(event: IEvent): Promise<void> {
    await this._eventPublisher.connect();
    await this._eventPublisher.publish(event);
    await this._eventPublisher.disconnect();
  }
}
