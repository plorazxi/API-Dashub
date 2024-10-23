import { PrismaClient } from "@prisma/client";
import express from "express";
import { verify } from "jsonwebtoken";
import { ENV } from "../env";
import { user_tokenSchema } from "../interfaces/dashInterface";

const router = express.Router();
const prisma = new PrismaClient;

router.get('/:token', (req, res) => {
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
    let dashboards = prisma.dashboard.findMany({
        where: {
            userid: user.id
        },
        include: {
            graficos: true
        }
    });
    res.send(dashboards);
});

module.exports = router;