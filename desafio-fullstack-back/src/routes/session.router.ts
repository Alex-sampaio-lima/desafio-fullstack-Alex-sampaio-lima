import { Router } from "express";
import { createLoginController } from "../controllers/session.controller";
import { validateBody } from "../middlewares/validatedBody.middleware";
import { clientLoginSchema } from "../schemas/client.schemas";

export const sessionRouter: Router = Router()

sessionRouter.post('/', validateBody(clientLoginSchema), createLoginController);