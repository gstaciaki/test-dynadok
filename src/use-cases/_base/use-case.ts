export abstract class BaseUseCase<Input, Output> {
  protected abstract validate(data: Input): void;

  public async performExecute(data: Input): Promise<Output> {
    this.validate(data);
    return this.execute(data);
  }

  protected abstract execute(data: Input): Promise<Output>;
}
