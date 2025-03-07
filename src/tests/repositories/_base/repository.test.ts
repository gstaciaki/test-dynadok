import { BaseRepository } from "../../../infrastructure/repositories/_base/repository";
import { initializeTestDB, stopTestDB } from "../../test-utils";
import { TestEntity } from "./mocks/entity-mock";

describe("BaseRepository with BaseEntity", () => {
  let baseRepository: BaseRepository<TestEntity>;

  beforeAll(async () => {
    await initializeTestDB();
    baseRepository = new BaseRepository(TestEntity);
  });

  afterAll(async () => {
    await stopTestDB();
  });

  it("should create a new entity", async () => {
    const entity = await baseRepository.create({});
    expect(entity).toHaveProperty("id");
    expect(entity).toHaveProperty("createdAt");
    expect(entity).toHaveProperty("updatedAt");
  });

  it("should find an entity by id", async () => {
    const entity = await baseRepository.create({});

    const foundEntity = await baseRepository.findOne(entity.id);
    expect(foundEntity).toBeTruthy();
  });

  it("should update an entity", async () => {
    const entityData = { name: "Jane Doe", email: "jane@example.com" };
    const entity = await baseRepository.create(entityData);

    const updatedData = { name: "Jane Smith" };
    const updatedEntity = await baseRepository.update(entity.id, updatedData);

    expect(updatedEntity.name).toBe(updatedData.name);
  });

  it("should delete an entity", async () => {
    const entityData = { name: "Jane Doe", email: "jane@example.com" };
    const entity = await baseRepository.create(entityData);

    await baseRepository.delete(entity.id);
    const deletedEntity = await baseRepository.findOne(entity.id);
    expect(deletedEntity).toBeNull();
  });
});
