import { PrismaClient } from "@prisma/client";
import express from "express"
import { DeleteGraph, DeleteGraphSchema, grafico, ReqGet, ReqGetSchema, ReqNewGraph, ReqNewGraphSchema } from "../interfaces/graphInterface";
import { verify } from "jsonwebtoken";
import { ENV } from "../env";

const router = express.Router();
const prisma = new PrismaClient;

router.get('/', async (req, res) => {
    let request: ReqGet;
    try {
        request = ReqGetSchema.parse(req.body);
    } catch(e) {
        res.status(400).send({msg: "Requisição mal feita"});
        return ;
    }
    let ver_token: object | null | void = verify(request.token, ENV.SECRETKEY, (err, decoded) => {
        if (err) {
            res.status(401).send({ msg: "token inválido" });
            return null;
        } else return decoded;
    });
    if(ver_token === null) {
        return ;
    }
    let response!: grafico[];
    let graphics = await prisma.grafico.findMany({
        where: {
            dashbardId: request.dashID
        }
    });
    graphics.map(async (value) => {
        let ref = await prisma.referencia.findMany({
            where: {
                graficoId: value.id
            }
        });
        let atributos = ref.map((obj) => {
            return obj.nome;
        });
        let valores = ref.map((obj) => {
            return obj.valor;
        });
        let cores = ref.map((obj) => {
            return obj.cor;
        });
        let graph: grafico = {
            id: value.id,
            nome: value.nome,
            tipo: value.tipo,
            ordem: value.ordem,
            atributos: atributos,
            valores: valores,
            cores: cores
        };
        response.push(graph);
    });
    res.send(response);
});

router.post('/create', async (req, res) => {
    let request: ReqNewGraph;
    try {
        request = ReqNewGraphSchema.parse(req.body);
    } catch(e) {
        res.status(400).send({msg: "Requisição mal feita"});
        return ;
    }
    let ver_token: object | null | void = verify(request.token, ENV.SECRETKEY, (err, decoded) => {
        if (err) {
            res.status(401).send({ msg: "token inválido" });
            return null;
        } else return decoded;
    });
    if(ver_token === null) {
        return ;
    }
    let graph = await prisma.grafico.create({
        data: {
            nome: request.nome,
            ordem: request.ordem,
            tipo: request.tipo,
            dashbardId: request.dashId
        }
    });
    for(let i=0; i<request.valores.length; i++) {
        await prisma.referencia.create({
            data: {
                nome: request.nome[i],
                valor: request.valores[i],
                cor: request.cores[i],
                graficoId: graph.id
            }
        });
    }
    res.send({msg: "tabela  criada com sucesso!"});
});

router.delete('/delete', async (req, res) => {
    let request: DeleteGraph;
    try {
        request = DeleteGraphSchema.parse(req.body);
    } catch(e) {
        res.status(400).send({msg: "Requisição mal feita"});
        return ;
    }
    let ver_token: object | null | void = verify(request.token, ENV.SECRETKEY, (err, decoded) => {
        if (err) {
            res.status(401).send({ msg: "token inválido" });
            return null;
        } else return decoded;
    });
    if(ver_token === null) {
        return ;
    }
    await prisma.grafico.delete({
        where: {
            id: request.id
        }
    });
    await prisma.referencia.deleteMany({
        where: {
            graficoId: request.id
        }
    });
    res.send({msg: "Exclusão realizada com sucesso"});
});

module.exports = router;