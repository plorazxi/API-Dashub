import z from "zod";

export const ReqGetSchema = z.object({
    dashID: z.number(),
    token: z.string()
});

export type ReqGet = z.infer<typeof ReqGetSchema>;

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

export const ReqNewGraphSchema = z.object({
    nome: z.string(),
    tipo: z.string(),
    ordem: z.string(),
    elementos: z.string().array(),
    dados: z.number().array(),
    cores: z.string().array(),
    dashId: z.number(),
    token: z.string()
});

export type ReqNewGraph = z.infer<typeof ReqNewGraphSchema>;

export const DeleteGraphSchema = z.object({
    id: z.number(),
    token: z.string()
});

export type DeleteGraph = z.infer<typeof DeleteGraphSchema>;