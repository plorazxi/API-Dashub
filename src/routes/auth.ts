import express from "express";
import { login, loginSchema, NewUser, NovoEmail, NovoEmailSchema, NovoNome, NovoNomeSchema } from "../interfaces/authInterface";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { randomInt } from "crypto";
import { ENV } from "../env";

const router = express.Router();
const prisma = new PrismaClient;

router.post('/register', async (req, res) => {
    //pegando as informações necessárias para criar usuário
    const { nome, email, senha } = req.body;
    //verificando se o email não está sendo utilizado
    let val_email = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if(val_email) {
        res.status(401).send({msg: "email sendo utilizado"});
        return ;
    }
    //criando objeto NewUser e colocando no banco de dados
    let user: NewUser = {
        nome: nome,
        email: email, 
        senha: await hash(senha, randomInt(10, 16))
    }
    const userDB = await prisma.user.create({
        data: user
    });
    //criando o token e enviando response
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
    //pegando o corpo da requisição e validando os tipos de dados
    let requisicao: login;
    try {
        requisicao = loginSchema.parse(req.body);
    } catch(e) {
        res.status(400).send({msg: "requisição mal feita"});
        return ;
    }
    //procurando o usuário pelo email
    let user = await prisma.user.findUnique({
        where: {
            email: requisicao.email
        }
    });
    if(!user) {
        res.status(404).send({ msg: "Usuário não encontrado" });
        return ;
    }
    //comparando a senha
    if(await compare(requisicao.senha, user.senha)) { //se certa, retorna o token
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
    } else { //se errado, envia uma mensagem de erro
        res.status(401).send({msg: "Senha incorreta"});
    }
});

router.put('/esqueci-senha', async (req, res) => {
    //pegando e validando o corpo da requisição
    let requisicao: login;
    try {
        requisicao = loginSchema.parse(req.body);
    } catch(e) {
        res.status(400).send({msg: "requisição mal feita"});
        return ;
    }
    //fazendo a alteração da senha e enviando response
    await prisma.user.update({
        where: {
            email: requisicao.email
        },
        data: {
            senha: await hash(requisicao.senha, randomInt(10, 16))
        }
    });
    res.send({msg: "senha alterada com sucesso"});
});

router.put('/mudar-nome', async (req, res) => {
    //pegando e verificando os tipos da requisição 
    let requisicao: NovoNome;
    try{
        requisicao = NovoNomeSchema.parse(req.body);
    } catch(e) {
        res.status(400).send({msg: "requisição mal feita"});
        return ;
    }
    //procurando e validando o usuário no banco de dados
    let user = await prisma.user.findUnique({
        where: {
            email: requisicao.email
        }
    });
    if(!user) {
        res.status(404).send({msg: "usuario não encontrado"});
        return ;
    }
    //comparando a senha e fazendo a alteração do nome
    if(await compare(requisicao.senha, user.senha)) {
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                nome: requisicao.nome
            }
        });
        res.send({msg: "nome alterado com sucesso"});
        return ;
    } else {
        res.status(401).send({msg: "senha incorreta"});
        return ;
    }
});

router.put('/mudar-email', async (req, res) => {
    //pegando e verificando o corpo da requisição
    let requisicao: NovoEmail;
    try{
        requisicao = NovoEmailSchema.parse(req.body);
    } catch(e) {
        res.status(400).send({msg: "requisição mal feita"});
        return ;
    }
    //pegando o usuário do banco de dados
    let user = await prisma.user.findUnique({
        where: {
            email: requisicao.email
        }
    });
    if(!user) {
        res.status(404).send({msg: "usuario não encontrado"});
        return ;
    }
    //comparando a sennha e realizando a alteração
    if(await compare(requisicao.senha, user.senha)) {
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                email: requisicao.email_novo
            }
        });
        res.send({msg: "email alterado com sucesso"});
        return ;
    } else {
        res.status(401).send({msg: "senha incorreta"});
        return ;
    }
});

module.exports = router;