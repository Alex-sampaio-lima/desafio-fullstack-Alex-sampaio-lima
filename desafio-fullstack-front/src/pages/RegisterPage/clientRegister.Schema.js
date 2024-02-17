import { z } from "zod";

export const clientRegisterSchema = z.object({
    name: z.string().max(60).refine(value => value.length <= 60, { message: "O nome deve conter apenas 60 caracteres" }),
    password: z.string().max(255),
    tel: z.string().max(11).refine(value => value.length <= 11, { message: 'O número de telefone deve ter no máximo 11 caracteres.' }),

})