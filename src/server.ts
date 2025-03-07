import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./infrastructure/database/data-source";
import { routes } from "./interfaces/routes";
import { setupKafkaConsumer } from "./infrastructure/messaging/setup-consumer";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("API funcionando!");
});

app.use("/api", routes);

setupKafkaConsumer();

AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao conectar no banco de dados", error);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
