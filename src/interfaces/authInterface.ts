import z from "zod";

export const NewUserSchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    senha: z.string()
});

export type NewUser = z.infer<typeof NewUserSchema>;

export const loginSchema = z.object({
    email: z.string().email(),
    senha: z.string()
});

export type login = z.infer<typeof loginSchema>;

export const NovoNomeSchema = z.object({
    email: z.string().email(),
    email_novo: z.string().email(),
    senha: z.string(),
    nome: z.string()
});

export type NovoNome = z.infer<typeof NovoNomeSchema>;