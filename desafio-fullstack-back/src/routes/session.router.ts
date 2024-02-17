import { Router } from "express";
import { createLoginController } from "../controllers/session.controller";

export const sessionRouter: Router = Router()

sessionRouter.post('/', createLoginController);