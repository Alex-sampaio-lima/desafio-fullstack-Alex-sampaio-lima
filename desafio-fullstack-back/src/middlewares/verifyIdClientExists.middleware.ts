import { NextFunction, Request, Response } from "express";
import { clientRepo } from "../repositories";
import Client from "../entities/client.entity";
import AppError from "../errors/AppError.error";



export const verifyIdClientExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const foundClient: Client | null = await clientRepo.findOneBy({ id: (req.params.clientId) })

    if (!foundClient) {
        throw new AppError("Client not found.", 404)
    }

    res.locals = { ...res.locals, foundClient }
    return next()
}



