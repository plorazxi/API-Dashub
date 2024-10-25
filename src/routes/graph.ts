import { PrismaClient } from "@prisma/client";
import express from "express"
import { DeleteGraph, DeleteGraphSchema, grafico, ReqGet, ReqGetSchema, ReqNewGraph, ReqNewGraphSchema } from "../interfaces/graphInterface";
import { verify } from "jsonwebtoken";
import { ENV } from "../env";

const router = express.Router();
const prisma = new PrismaClient;

router.post('/', async (req, res) => {
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
    let graphics = await prisma.grafico.findMany({
        where: {
            id_dash: request.dashId
        }
    });
    let promecas = graphics.map(async (value) => {
        let ref = await prisma.referencia.findMany({
            where: {
                graficoId: value.id
            }
        });
        let elementos = ref.map((obj) => {
            return obj.nome;
        });
        let dados = ref.map((obj) => {
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
            elementos: elementos,
            dados: dados,
            cores: cores,
            id_dash: request.dashId
        };
        return graph;
    });
    let response = await Promise.all(promecas);
    res.send(response);
});

router.post('/create', async (req, res) => {
    let request: ReqNewGraph;
    try {
        request = ReqNewGraphSchema.parse(req.body);
    } catch(e) {
        console.log(e);
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
            id_dash: request.dashId
        }
    });
    for(let i=0; i<request.dados.length; i++) {
        await prisma.referencia.create({
            data: {
                nome: request.nome[i],
                valor: Number(request.dados[i]),
                cor: request.cores[i],
                graficoId: graph.id
            }
        });
    }
    res.send({msg: "tabela criada com sucesso!"});
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
    res.send({msg: "Exclusão realizada com sucesso"});
});

module.exports = router;