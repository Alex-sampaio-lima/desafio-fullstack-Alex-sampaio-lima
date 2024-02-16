import express, { Application, json } from "express";
import { routes } from "./routes";
import { handlErrors } from "./middlewares/handleErrors.middlewares";
import { handleZodErrors } from "./middlewares/handleZodErrors.middleware";

import cors from "cors";

export const app: Application = express();

app.use(json());

app.use(cors());

app.use("/", routes)

// app.use(handleZodErrors);
app.use(handlErrors)









