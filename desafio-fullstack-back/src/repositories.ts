import { Repository } from "typeorm";
import { AppDataSource } from "./data-source";
import Client from "./entities/client.entity";
import Contact from "./entities/contact.entity";
import { ClientRepo } from "./interfaces/client.interface";
import { ContactRepo } from "./interfaces/contact.interface";


export const clientRepo: ClientRepo = AppDataSource.getRepository(Client)

export const contactRepo: ContactRepo = AppDataSource.getRepository(Contact)