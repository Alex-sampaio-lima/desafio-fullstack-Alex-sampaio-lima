import { z } from "zod"
import { clientReadSchema } from "../schemas/client.schemas"
import { contactCreateSchema, contactReadSchema, contactReturnSchema,  contactSchema, contactUpdateSchema } from "../schemas/contact.schemas"
import Contact from "../entities/contact.entity"
import { DeepPartial, Repository } from "typeorm"

export type ContactCreate = z.infer<typeof contactCreateSchema>
export type ContactRead = z.infer<typeof contactReadSchema>
export type ContactUpdate = z.infer<typeof contactUpdateSchema >
export type ContactReturn = z.infer<typeof contactReturnSchema>

export type ContactRepo = Repository<Contact>