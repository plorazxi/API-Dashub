import { PrismaClient } from "@prisma/client";
import express from "express";
import { verify } from "jsonwebtoken";
import { ENV } from "../env";
import { MudarNome, MudarNomeSchema, ReqDelete, ReqDeleteSchema, ReqNewDash, ReqNewDashSchema, user_tokenSchema } from "../interfaces/dashInterface";

const router = express.Router();
const prisma = new PrismaClient;

router.get('/:token', async (req, res) => {
    //pegando e verificando o token 
    const token: string = req.params.token;
    let ver_token: object | null | void = verify(token, ENV.SECRETKEY, (err, decoded) => {
        if (err) {
            res.status(401).send({ msg: "token inválido" });
            return null;
        } else return decoded;
    });
    if(ver_token === null) {
        return ;
    }
    //transformando o payload em usuário
    let user = user_tokenSchema.parse(ver_token);
    //pegando todos os dashboards do usuário
    let dashboards = await prisma.dashboard.findMany({
        where: {
            id_user: user.id
        },
        include: {
            graficos: true
        }
    });
    res.send(dashboards);
});

router.post('/create', async (req, res) => {
    //pegando e tipando o corpo da requisição
    let request: ReqNewDash;
    try {
        request = ReqNewDashSchema.parse(req.body);
    } catch(e) {
        res.status(400).send({msg: "Requisição mal feita"});
        return ;
    }
    //verificando o token e transformando-o em user
    let ver_token: object | null | void = verify(request.token, ENV.SECRETKEY, (err, decoded) => {
        if (err) {
            res.status(401).send({ msg: "token inválido" });
            return null;
        } else return decoded;
    });
    if(ver_token === null) {
        return ;
    }
    let user = user_tokenSchema.parse(ver_token);
    //criando o dashbard do usuário
    await prisma.dashboard.create({
        data: {
            nome: request.nome,
            id_user: user.id

        }
    });
    res.send({msg: "Dashboard criado com sucesso"});
});

router.put('/mudar-nome', async (req, res) => {
    //pegando e tipando o corpo da requisição
    let request: MudarNome;
    try {
        request = MudarNomeSchema.parse(req.body);
    } catch(e) {
        res.status(400).send({msg: "Requisição mal feita"});
        return ;
    }
    //verificando token
    let ver_token: object | null | void = verify(request.token, ENV.SECRETKEY, (err, decoded) => {
        if (err) {
            res.status(401).send({ msg: "token inválido" });
            return null;
        } else return decoded;
    });
    if(ver_token === null) {
        return ;
    }
    //alterando o nome no banco de dados
    await prisma.dashboard.update({
        where: {
            id: request.id
        },
        data: {
            nome: request.novo_nome
        }
    });
    res.send({msg: "nome alterado com sucesso"});
});

router.delete('/delete', async (req, res) => {
    //pegando e tipando o corpo da requisição
    let request: ReqDelete;
    try {
        request = ReqDeleteSchema.parse(req.body);
    } catch(e) {
        res.status(400).send({msg: "Requisição mal feita"});
        return ;
    }
    //validando o token
    let ver_token: object | null | void = verify(request.token, ENV.SECRETKEY, (err, decoded) => {
        if (err) {
            res.status(401).send({ msg: "token inválido" });
            return null;
        } else return decoded;
    });
    if(ver_token === null) {
        return ;
    }
    //deletando o dashboard no banco de dados
    await prisma.dashboard.delete({
        where: {
            id: request.id
        }
    });
    res.send({msg: "Dashboard deletado com sucesso"});
});

module.exports = router;