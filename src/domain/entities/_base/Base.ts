export class Base {
  constructor(
    public id: string = "",
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}
