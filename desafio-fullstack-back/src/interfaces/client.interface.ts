import { z } from "zod";
import { clientCreateSchema, clientLoginSchema, clientReadByIdSchema, clientReadSchema, clientReturnSchema } from "../schemas/client.schemas";
import { DeepPartial, Repository } from "typeorm";
import Client from "../entities/client.entity";

export type ClientCreate = z.infer<typeof clientCreateSchema>
export type ClientRead = z.infer<typeof clientReadSchema>
export type ClientReadById = z.infer<typeof clientReadByIdSchema>
export type ClientReturn = z.infer<typeof clientReturnSchema>
export type ClientBodyUpdate = Omit<ClientCreate, 'admin'>
export type ClientUpdate = DeepPartial<ClientBodyUpdate>
export type ClientLoginCreate = z.infer<typeof clientLoginSchema>
export type ClientLoginReturn = { token: string }

export type ClientRepo = Repository<Client>