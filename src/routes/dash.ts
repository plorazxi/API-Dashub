import { PrismaClient } from "@prisma/client";
import express from "express";
import { verify } from "jsonwebtoken";
import { ENV } from "../env";
import { MudarNome, MudarNomeSchema, ReqDelete, ReqDeleteSchema, ReqNewDash, ReqNewDashSchema, user_tokenSchema } from "../interfaces/dashInterface";

const router = express.Router();
const prisma = new PrismaClient;

router.get('/:token', async (req, res) => {
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
    let user = user_tokenSchema.parse(ver_token);
    let dashboards = await prisma.dashboard.findMany({
        where: {
            userid: user.id
        },
    });
    res.send(dashboards);
});

router.post('/create', async (req, res) => {
    let request: ReqNewDash;
    try {
        request = ReqNewDashSchema.parse(req.body);
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
    let user = user_tokenSchema.parse(ver_token);
    await prisma.dashboard.create({
        data: {
            nome: request.nome,
            userid: user.id,
        }
    });
    res.send({msg: "Dashboard criado com sucesso"});
});

router.put('/mudar-nome', async (req, res) => {
    let request: MudarNome;
    try {
        request = MudarNomeSchema.parse(req.body);
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
    let request: ReqDelete;
    try {
        request = ReqDeleteSchema.parse(req.body);
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
    await prisma.dashboard.delete({
        where: {
            id: request.id
        }
    });
    res.send({msg: "Dashboard deletado com sucesso"});
})

module.exports = router;