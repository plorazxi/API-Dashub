import z from "zod";

export const user_tokenSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    nome: z.string()
})