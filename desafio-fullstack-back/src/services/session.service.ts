import 'dotenv/config'
import Client from "../entities/client.entity";
import { clientRepo } from "../repositories";
import AppError from "../errors/AppError.error";
import { ClientLoginCreate, ClientLoginReturn } from "../interfaces/client.interface";
import { compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

export const createLoginService = async (data: ClientLoginCreate): Promise<ClientLoginReturn> => {

    const { name } = data
    const client: Client | null = await clientRepo.findOneBy({ name })

    if (!client) {
        throw new AppError("Invalid credentials", 401)
    }

    const comparePass = await compare(data.password, client.password)

    if (!comparePass) {
        throw new AppError("Invalid credentials", 401)
    }

    const token: string = sign(
        { id: client.id, name: client.name, admin: client.admin },
        process.env.SECRET_KEY!,
        { subject: client.id.toString(), expiresIn: process.env.EXPIRES_IN! }
    )
    

    return { token }
}