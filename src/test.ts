import { Prisma, PrismaClient } from "@prisma/client";

const prismaaa = new PrismaClient;

async function criar() {
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

export async function test1() {
    return await prismaaa.grafico.findMany({
        include: {
            dados: true,
        }
    })
}

interface ObjRespo {
    id: string
    nome: string
    tipo: string
    dashboardId: string
    elementos: string[]
    dados: number[]
    cores: string[]
}

export async function test2() {
    let grafico = (await prismaaa.grafico.findMany())[0];
    let ref = await prismaaa.dado.findMany({
        where: {
            graficoId: grafico.id
        }
    });
    let elementos = ref.map((obj) => {
        return obj.nome;
    });
    let dado = ref.map((obj) => {
        return obj.valor;
    });
    let cores = ref.map((obj) => {
        return obj.cor;
    });
    let resposta: ObjRespo = {
        id: grafico.id,
        nome: grafico.nome,
        tipo: grafico.tipo,
        dashboardId: grafico.dashbardId,
        elementos: elementos,
        dados: dado,
        cores: cores
    };
    return resposta;
}

async function acessar() {
    let ref = await prismaaa.user.findUnique({
        where: {
            email: 'paul.ss.loraschi@gmail.com'
        }
    });
    console.log(ref);
}

criar();

acessar();

module.exports = { test1, test2 }