import express from "express";
import { mandar } from "./test.js";
require('dotenv').config();

const env = process.env;
const app = express();

app.use(express.json());

app.get('/test', async (req, res) => {
    console.log(await mandar());
    res.send(await mandar());
})

app.get('/', (req, res) => {
    res.send('rota principal');
});

app.listen(env.PORT, () => {
    console.log('server on');
});