import { Router } from "express";
import { clientRouter } from "./client.router";
import { contactRouter } from "./contact.router";
import { sessionRouter } from "./session.router";

export const routes: Router = Router()

routes.use("/client", clientRouter);
routes.use("/contact", contactRouter);
routes.use("/login", sessionRouter)
