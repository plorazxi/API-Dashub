import { z } from "zod";

//configurando as chaves dentro do arquivo '.env'
const envSchema = z.object({
  SECRETKEY: z.string(),
  PORT: z.string()
});

//exportando o arquivo '.env' em uma constante 'ENV'
export const ENV = envSchema.parse(process.env);