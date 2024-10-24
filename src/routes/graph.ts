import { PrismaClient } from "@prisma/client";
import express from "express"
import { ReqGet, ReqGetSchema } from "../interfaces/graphInterface";

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
    let response: object[];
    let graphics = await prisma.grafico.findMany({
        where: {
            dashbardId: request.dashID
        }
    });
    graphics.map((value) => {
        
    });
});

module.exports = router;