import { Router } from "express";
import { createClientController, deleteClientController, readClientsController, updateClientController } from "../controllers/client.controllers";
import { verifyIdClientExists } from "../middlewares/verifyIdClientExists.middleware";
import { validateBody } from "../middlewares/validatedBody.middleware";
import { clientCreateSchema, clientUpdateSchema } from "../schemas/client.schemas";
import { vefiryIfTelIsValid } from "../middlewares/vefiryIfTelIsValid.middleware";
import { ifClientNameExists } from "../middlewares/ifClientNameExists.middleware";
import { verifyAdmin, verifyPermission, verifyToken } from "../middlewares/globals.middleware";

export const clientRouter: Router = Router();

clientRouter.get("/", verifyToken, verifyAdmin, readClientsController)
clientRouter.post("/", validateBody(clientCreateSchema), ifClientNameExists, vefiryIfTelIsValid, createClientController)

clientRouter.use("/:clientId", verifyIdClientExists)

clientRouter.patch("/:clientId", validateBody(clientUpdateSchema), verifyToken, verifyPermission, vefiryIfTelIsValid, updateClientController)
clientRouter.delete("/:clientId", verifyToken, verifyPermission, deleteClientController)