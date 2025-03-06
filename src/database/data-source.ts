import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.DATABASE_URL,
  database: process.env.DATABASE_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: [__dirname + "/../entities/*.ts"],
});
