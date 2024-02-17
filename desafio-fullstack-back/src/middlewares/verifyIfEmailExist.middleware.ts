import { NextFunction, Request, Response } from "express";
import { contactRepo } from "../repositories";
import Contact from "../entities/contact.entity";
import AppError from "../errors/AppError.error";

export const verifyIfEmailExist = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email) {
        return next()
    }

    const foundEmail: Contact | null = await contactRepo.findOneBy({ email: req.body.email })

    if (foundEmail == null) {
        throw new AppError("Email é obrigatorio", 409);
    }

    // console.log("REQ AQUI", req.body)

    console.log("RES AQUI", res )
    if (!foundEmail) {
        throw new AppError("Email already exists, try another one", 409);
    }
    
    res.locals = { ...res.locals, foundEmail }
    
    
    return next();
}