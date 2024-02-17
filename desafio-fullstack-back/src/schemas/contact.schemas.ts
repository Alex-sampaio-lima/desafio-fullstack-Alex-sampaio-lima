import { z } from "zod";
import { clientReadSchema, clientReturnSchema, clientSchema } from "./client.schemas";

export const contactSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    tel: z.string().max(11),
    registrationDate: z.string().or(z.date()),
    clientId: z.string(),
    client: clientReturnSchema
})

export const contactCreateSchema = contactSchema.omit({ id: true, client: true })
export const contactUpdateSchema = contactSchema.pick({ email: true, tel: true })
export const contactReturnSchema = contactSchema.omit({ clientId: true, client: true })
export const contactReadSchema = contactReturnSchema.array()
export const contactWitouthClient = contactSchema.omit({ client: true, clientId: true })