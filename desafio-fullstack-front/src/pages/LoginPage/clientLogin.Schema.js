import { z } from "zod";

export const clientLoginSchema = z.object({
    name: z.string().max(60).refine(value => value.length <= 60, { message: "O nome deve conter apenas 60 caracteres" }),
    password: z.string().max(255)
})