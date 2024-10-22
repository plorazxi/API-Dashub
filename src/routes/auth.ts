import express from "express";
import { loginSchema, NewUser } from "../interfaces/user";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { randomInt } from "crypto";
import { ENV } from "../env";

const router = express.Router();
const prisma = new PrismaClient;

router.post('/register', async (req, res) => {
    const { nome, email, senha } = req.body;
    let val_email = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if(val_email) {
        res.status(401).send({msg: "email sendo utilizado"});
        return ;
    }
    let user: NewUser = {
        nome: nome,
        email: email, 
        senha: await hash(senha, randomInt(10, 16))
    }
    const userDB = await prisma.user.create({
        data: user
    });
    let jwt = sign(userDB, ENV.SECRETKEY, {
        algorithm: "HS256",
        expiresIn: '1h'
    });
    res.send({
        msg: "usuario criado com sucesso",
        nome: userDB.nome,
        email: userDB.email,
        token: jwt
    });
});

router.post('/login', async (req, res) => {
    let requisicao;
    try {
        requisicao = loginSchema.parse(req.body);
    } catch(e) {
        res.status(400).send({msg: "requisição mal feita"});
        return ;
    }
    let user = await prisma.user.findUnique({
        where: {
            email: requisicao.email
        }
    });
    if(!user) {
        res.status(404).send({ msg: "Usuário não encontrado" });
        return ;
    }
    if(await compare(requisicao.senha, user.senha)) {
        let token = sign(user, ENV.SECRETKEY, {
            algorithm: 'HS256',
            expiresIn: '1h'
        });
        res.send({
            msg: "login efetuado com sucesso",
            nome: user.nome,
            email: user.email,
            token: token
        });
    } else {
        res.status(401).send({msg: "Senha incorreta"});
    }
});

module.exports = router;