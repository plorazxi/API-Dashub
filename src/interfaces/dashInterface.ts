import z from "zod";

//Schema do payload do token
export const user_tokenSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    nome: z.string(),
    senha: z.string()
});

//Schema da requisição de criar um novo dashboard, o corpo da requisição
export const ReqNewDashSchema = z.object({
    nome: z.string(),
    token: z.string()
});

export type ReqNewDash = z.infer<typeof ReqNewDashSchema>;

//Schema da requisição de mudar o nome do dashboard, o corpo da requisição
export const MudarNomeSchema = z.object({
    id: z.number(),
    novo_nome: z.string(),
    token: z.string()
});

export type MudarNome = z.infer<typeof MudarNomeSchema>;

//Schema da requisição de deletar o dashboard, o corpo da requisição
export const ReqDeleteSchema = z.object({
    id: z.number(),
    token: z.string()
});

export type ReqDelete = z.infer<typeof ReqDeleteSchema>;