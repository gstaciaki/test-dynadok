import { Router } from "express";
import { ClientController } from "../controllers/client.controller";

const clientRoutes = Router();
const clientController = new ClientController();

clientRoutes
  .post("/clients", (req, res) => clientController.create(req, res))
  .get("/clients", (req, res) => clientController.index(req, res))
  .get("/clients/:id", (req, res) => clientController.show(req, res))
  .put("/clients/:id", (req, res) => clientController.update(req, res))
  .delete("/clients/:id", (req, res) => clientController.delete(req, res));

export { clientRoutes };
