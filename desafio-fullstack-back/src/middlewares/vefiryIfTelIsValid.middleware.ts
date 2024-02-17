import { NextFunction, Request, Response } from "express";
import { clientRepo } from "../repositories";
import Client from "../entities/client.entity";
import AppError from "../errors/AppError.error";



export const vefiryIfTelIsValid = async (req: Request, res: Response, next: NextFunction) => {
    const { tel } = req.body
    if (tel == "") {
        throw new AppError("The phone number cannot be null.", 409);
    }
    if (tel && tel.length == 11) {
        return next();
    } else {
        throw new AppError("Phone number isn't valid, must be 11.", 409);
    }
}