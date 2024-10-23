import z from "zod";

export interface NewUser {
    nome: string
    email: string
    senha: string
}

export const loginSchema = z.object({
    email: z.string().email(),
    senha: z.string()
});

