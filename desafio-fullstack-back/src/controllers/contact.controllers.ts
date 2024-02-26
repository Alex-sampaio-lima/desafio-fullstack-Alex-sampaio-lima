import { NextFunction, Request, Response } from "express";
import { createContactService, deleteContactService, readContactByIdService, readContactService, updateContactService } from "../services/contact.service";
import Contact from "../entities/contact.entity";
import { ContactRead } from "../interfaces/contact.interface";

export const createContactController = async (req: Request, res: Response) => {
    const contact = req.params.clientId;
    const newContact = await createContactService(contact, req.body);
    return res.status(201).json(newContact);
}

export const readContactController = async (req: Request, res: Response) => {
    const contacts: ContactRead = await readContactService()
    return res.status(201).json(contacts);
}
export const readContactByIdController = async (req: Request, res: Response) => {
    const contactId  = req.params.contactId
    const contact: ContactRead = await readContactByIdService(contactId)
    return res.status(200).json(contact)
}

export const updateContactController = async (req: Request, res: Response) => {
    const foundContact = req.params.contactId
    const contact = await updateContactService(foundContact, req.body)
    return res.status(200).json(contact);
}

export const deleteContactController = async (req: Request, res: Response) => {
    const foundContact = req.params.contactId
    await deleteContactService(foundContact);
    return res.status(204).send();
}