import { Request, Response } from "express";
import { createClientService, deleteClientService, readClientsService, updateClienteService } from "../services/clients.services";
import Client from "../entities/client.entity";
import { ClientRead, ClientReturn, ClientUpdate } from "../interfaces/client.interface";

export const createClientController = async (req: Request, res: Response): Promise<Response> => {
    const client: ClientReturn = await createClientService(req.body)
    return res.status(201).json(client)
}

export const readClientsController = async (req: Request, res: Response): Promise<Response> => {
    const clients: ClientRead = await readClientsService()
    return res.status(200).json(clients)
}

export const updateClientController = async (req: Request, res: Response): Promise<Response> => {
    const { foundClient } = res.locals
    // const clientFound = req.params.clientId
    // console.log("aqui==",clientFound)
    const client: ClientUpdate = await updateClienteService(foundClient, req.body)
    return res.status(200).json(client)
}

export const deleteClientController = async (req: Request, res: Response) => {
    const clientFound = req.params.clientId
    console.log(clientFound)
    await deleteClientService((clientFound))
    return res.status(204).send()
}