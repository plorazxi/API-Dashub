import { z } from "zod";

const envSchema = z.object({
  SECRETKEY: z.string(),
  PORT: z.string()
});

export const ENV = envSchema.parse(process.env);