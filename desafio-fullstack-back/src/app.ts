import express, { Application, json } from "express";
import { routes } from "./routes";
import { handlErrors } from "./middlewares/handleErrors.middlewares";
import { handleZodErrors } from "./middlewares/handleZodErrors.middleware";
import cors from "cors";
import swaggerUiExpress from "swagger-ui-express"
import swaggerDocument from "./swagger.json"

export const app: Application = express();

app.use(json());

app.use(cors());

app.use("/api-documentation", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument))

app.use("/", routes)

// app.use(handleZodErrors);
app.use(handlErrors)









