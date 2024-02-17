import { z } from "zod";

export const contactEditSchema = z.object({
    email: z.string().email(),
    tel: z.string().max(11)
})