import z from "zod";

//Schema da requisição de pegar o grafico, o corpo da requisição
export const ReqGetSchema = z.object({
    dashId: z.number(),
    token: z.string()
});

export type ReqGet = z.infer<typeof ReqGetSchema>;

//Schema dos graficos que serão enviados para o front-end
export const GraficoSchema = z.object({
    id: z.number(),
    tipo: z.string(),
    elementos: z.string().array(),
    dados: z.number().array(),
    id_dash: z.number(),
    nome: z.string(),
    cores: z.string().array(),
    ordem: z.string()
});

export type grafico = z.infer<typeof GraficoSchema>;

//Schema da requisição de criar um novo grafico, corpo da requisição 
export const ReqNewGraphSchema = z.object({
    nome: z.string(),
    tipo: z.string(),
    ordem: z.string(),
    elementos: z.string().array(),
    dados: z.string().array(), // vai ser transformado em number
    cores: z.string().array(),
    dashId: z.number(),
    token: z.string()
});

export type ReqNewGraph = z.infer<typeof ReqNewGraphSchema>;

//Schema da requisição de deletar um grafico, corpo da requisição
export const DeleteGraphSchema = z.object({
    id: z.number(),
    token: z.string()
});

export type DeleteGraph = z.infer<typeof DeleteGraphSchema>;