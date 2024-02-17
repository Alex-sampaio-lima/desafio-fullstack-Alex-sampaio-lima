import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.error";
import { clientRepo } from "../repositories";
import Client from "../entities/client.entity";

export const ifClientNameExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.body
    const client: Client | null = await clientRepo.findOneBy({ name })
    if (client) {
        throw new AppError("Name already exists, try another one", 404)
    }

    return next();
}