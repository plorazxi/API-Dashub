import { PrismaClient } from "@prisma/client";
import express from "express";
import { verify } from "jsonwebtoken";
import { ENV } from "../env";

const router = express.Router();
const prisma = new PrismaClient;

router.get('/:token', (req, res) => {
    const token: string = req.params.token;
    let ver_token: object | null | void= verify(token, ENV.SECRETKEY, (err, decoded) => {
        if(err) {
            res.status(401).send({msg: "token inválido"});
            return null;
        } else return decoded;
    });
    if(!ver_token) {

    }
});

module.exports = router;