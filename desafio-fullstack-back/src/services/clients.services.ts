import Client from "../entities/client.entity";
import { clientRepo } from "../repositories";
import { ClientCreate, ClientRead, ClientReadById, ClientReturn, ClientUpdate } from "../interfaces/client.interface";
import { clientReadByIdSchema, clientReadSchema, clientReturnSchema, clientUpdateSchema } from "../schemas/client.schemas";
import Contact from "../entities/contact.entity";


export const createClientService = async (data: ClientCreate): Promise<ClientReturn> => {
    const newClient: Client = clientRepo.create(data);
    await clientRepo.save(newClient);
    return clientReturnSchema.parse(newClient);
}

export const readClientsService = async (): Promise<ClientRead> => {
    const clients: ClientRead = await clientRepo.find({ relations: { contact: true } })
    return clientReadSchema.parse(clients);
}
export const readClientByIdService = async (clientId: string): Promise<ClientReadById> => {
    const client: ClientReadById = await clientRepo.find({ where: { id: clientId }, relations: { contact: true } })
    return clientReadByIdSchema.parse(client);
}

export const updateClienteService = async (client: Client, data: ClientUpdate): Promise<ClientReturn> => {
    const clientUpdate: Client = clientRepo.create({ ...client, ...data });
    await clientRepo.save(clientUpdate);
    return clientReturnSchema.parse(clientUpdate);
}

export const deleteClientService = async (clientId: string): Promise<void> => {
    await clientRepo.delete({ id: clientId })
}




