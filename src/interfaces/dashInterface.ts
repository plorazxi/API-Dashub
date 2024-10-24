import z from "zod";

export const user_tokenSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    nome: z.string(),
    senha: z.string()
});

export const ReqNewDashSchema = z.object({
    nome: z.string(),
    token: z.string()
});

export const MudarNomeSchema = z.object({
    id: z.string(),
    novo_nome: z.string(),
    token: z.string()
})