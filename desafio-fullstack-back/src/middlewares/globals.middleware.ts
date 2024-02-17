import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.error";
import { verify } from "jsonwebtoken";
import Contact from "../entities/contact.entity";
import { clientRepo, contactRepo } from "../repositories";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const { authorization } = req.headers;

    if (!authorization) {
        throw new AppError("Missing bearer token", 404);
    }

    const token: string = authorization.split(' ')[1]
    const decoded = verify(token, process.env.SECRET_KEY!)
    res.locals = { ...res.locals, decoded }
    return next()
}


export const verifyAdmin = (req: Request, res: Response, next: NextFunction): void => {
    const { admin } = res.locals.decoded
    if (!admin) throw new AppError("insufficient permissions", 403)
    return next()
}

export const verifyPermission = (req: Request, res: Response, next: NextFunction): void => {
    const { clientId } = req.params
    const { sub, admin } = res.locals.decoded
    const { id } = res.locals.decoded

    if (admin) return next()

    if (clientId !== sub) throw new AppError("Insufficient permissions, you don't have access to this account ", 409)

    return next()
}



export const verifyContactPermission = (req: Request, res: Response, next: NextFunction) => {
    const { sub } = res.locals.decoded
    const { admin } = res.locals.decoded
    const foundContact = res.locals.foundContact.clientId
    console.log("sub=", sub)
    console.log("Contact=", foundContact)
    if (admin) return next()


    if (foundContact !== sub) {
        throw new AppError("Insufficient permissions, you don't have access to this account ", 409)
    }
    return next()
}