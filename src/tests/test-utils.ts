import { MongoMemoryServer } from "mongodb-memory-server";
import { AppDataSource } from "../infrastructure/database/data-source";
import { TestEntity } from "./repositories/_base/mocks/entity-mock.test";

let mongoServer: MongoMemoryServer;

export const initializeTestDB = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  AppDataSource.setOptions({
    type: "mongodb",
    url: uri,
    database: "test_db",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    entities: [__dirname + "/../entities/*.ts", TestEntity],
    
  });

  await AppDataSource.initialize();
};

export const stopTestDB = async () => {
  await AppDataSource.destroy();
  await mongoServer.stop();
};
