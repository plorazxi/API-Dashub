import { Prisma, PrismaClient } from "@prisma/client";

const prismaaa = new PrismaClient;

async function acessar() {
    await prismaaa.user.create({
        data: {
            nome: "Paulo",
            email: "paul.ss.loraschi@gmail.com",
            senha: "123",
            dashboard: {
                create: [
                    {
                        nome: "test1",
                        graficos: {
                            create: [
                                {
                                    nome: "vendas",
                                    tipo: "pizza",
                                    dados: {
                                        create: [
                                            { nome: "carro", valor: 123, cor: "red" },
                                            { nome: "moto", valor: 123456, cor: "yellow" }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    })
}

export async function mandar() {
    return await prismaaa.grafico.findMany({
        include: {
            dados: true,
        }
    })
}

mandar()

module.exports = { mandar }