import { Request } from "express";
import Client from "../entities/client.entity";
import Contact from "../entities/contact.entity";
import AppError from "../errors/AppError.error";
import { ContactCreate, ContactRead, ContactReturn, ContactUpdate } from "../interfaces/contact.interface";
import { clientRepo, contactRepo } from "../repositories";
import { contactReadSchema, contactReturnSchema, contactUpdateSchema } from "../schemas/contact.schemas";

export const createContactService = async (clientId: string, data: ContactCreate): Promise<ContactReturn> => {
    const client: Client | null = await clientRepo.findOneBy({ id: clientId })
    if (!client) throw new AppError("Client not found", 404)
    const newContact: Contact = contactRepo.create({ client, ...data })
    await contactRepo.save(newContact)
    console.log(newContact)
    return contactReturnSchema.parse(newContact)
}

export const readContactService = async (): Promise<ContactRead> => {
    const contacts: ContactRead = await contactRepo.find()
    return contactReadSchema.parse(contacts);
}

export const updateContactService = async (contactId: string, data: ContactUpdate): Promise<ContactUpdate> => {
    const contact: Contact | null = await contactRepo.findOneBy({ id: contactId })
    const newContact: Contact = contactRepo.create({ ...contact, ...data })
    await contactRepo.save(newContact);
    return contactUpdateSchema.parse(newContact);
}

export const deleteContactService = async (contactId: string): Promise<void> => {
    await contactRepo.delete({ id: contactId })
}