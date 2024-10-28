import z from "zod";

//Schema de novos usuários, para criar no banco de dados
export const NewUserSchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    senha: z.string()
});

export type NewUser = z.infer<typeof NewUserSchema>;

//Schema da requisição de login, o corpo da requisição
export const loginSchema = z.object({
    email: z.string().email(),
    senha: z.string()
});

export type login = z.infer<typeof loginSchema>;

//Schema da requisição de alterar nome, o corpo da requisição
export const NovoNomeSchema = z.object({
    email: z.string().email(),
    senha: z.string(),
    nome: z.string()
});

export type NovoNome = z.infer<typeof NovoNomeSchema>;

//Schema da requisição de alterar email, o corpo da requisição
export const NovoEmailSchema = z.object({
    email: z.string().email(),
    email_novo: z.string().email(),
    senha: z.string()
});

export type NovoEmail = z.infer<typeof NovoEmailSchema>;