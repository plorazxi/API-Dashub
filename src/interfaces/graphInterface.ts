import z from "zod";

export const ReqGetSchema = z.object({
    dashID: z.string(),
    token: z.string()
});

export type ReqGet = z.infer<typeof ReqGetSchema>;

export const GraficoSchema = z.object({
    id: z.string(),
    tipo: z.string(),
    nome: z.string(),
    ordem: z.string(),
    atributos: z.string().array(),
    valores: z.number().array(),
    cores: z.string().array()
});

export type grafico = z.infer<typeof GraficoSchema>;

export const ReqNewGraphSchema = z.object({
    nome: z.string(),
    tipo: z.string(),
    ordem: z.string(),
    atributos: z.string().array(),
    valores: z.number().array(),
    cores: z.string().array(),
    dashId: z.string(),
    token: z.string()
});

export type ReqNewGraph = z.infer<typeof ReqNewGraphSchema>;

export const DeleteGraphSchema = z.object({
    id: z.string(),
    token: z.string()
});

export type DeleteGraph = z.infer<typeof DeleteGraphSchema>;