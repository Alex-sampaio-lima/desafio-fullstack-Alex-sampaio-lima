import { z } from "zod";
import { contactWitouthClient } from "./contact.schemas";

export const clientSchema = z.object({
    id: z.string(),
    name: z.string().max(60).refine(value => value.length <= 60, { message: "O nome deve conter apenas 60 caracteres" }),
    password: z.string().max(255),
    tel: z.string().max(11).refine(value => value.length <= 11, { message: 'O número de telefone deve ter no máximo 11 caracteres.' }),
    registrationDate: z.string().or(z.date()),
    admin: z.boolean().default(false)
})

export const clientCreateSchema = clientSchema.pick({ name: true, password: true, tel: true, admin: true })
export const clientReturnSchema = clientSchema.omit({ password: true, admin: true })
export const clientReadSchema = clientReturnSchema.extend({ contact: contactWitouthClient.array() }).array()
export const clientReadByIdSchema = clientSchema.extend({ contact: contactWitouthClient.array() }).omit({ password: true, admin: true }).array()
export const clientWithoutAdminSchema = clientCreateSchema.omit({ admin: true })
export const clientUpdateSchema = clientWithoutAdminSchema.omit({ password: true })
export const clientLoginSchema = clientSchema.omit({ tel: true, admin: true, registrationDate: true, id: true })