import { Router } from "express";
import { ClientController } from "../controllers/client.controller";

const clientRoutes = Router();
const clientController = new ClientController();

const wrapAsync = (fn: Function) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

clientRoutes.get("/clients", wrapAsync(clientController.index));
clientRoutes.get("/clients/:id", wrapAsync(clientController.show));

clientRoutes.post("/clients", wrapAsync(clientController.create));

clientRoutes.put("/clients/:id", wrapAsync(clientController.update));

clientRoutes.delete("/clients/:id", wrapAsync(clientController.delete));

export { clientRoutes };
