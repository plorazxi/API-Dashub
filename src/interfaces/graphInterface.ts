import z from "zod";

export const ReqGetSchema = z.object({
    dashID: z.string(),
    token: z.string()
});

export type ReqGet = z.infer<typeof ReqGetSchema>;