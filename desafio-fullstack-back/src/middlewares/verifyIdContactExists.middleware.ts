import { NextFunction, Request, Response } from "express"
import AppError from "../errors/AppError.error"
import { contactRepo } from "../repositories"
import Contact from "../entities/contact.entity"



export const verifyIdExistsContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const foundContact: Contact | null = await contactRepo.findOneBy({ id: (req.params.contactId) })
    // console.log("aqui é o foundContact", foundContact)
    if (!foundContact) {
        throw new AppError("Contact not found.", 404)
    }

    res.locals = { ...res.locals, foundContact }
    return next();
}