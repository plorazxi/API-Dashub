import express from "express";
import { test1, test2 } from "./test.js";
require('dotenv').config();

const env = process.env;
const app = express();

app.use(express.json());

app.get('/test1', async (req, res) => {
    console.log(await test1());
    res.send(await test1());
});

app.get('/test2', async (req, res) => {
    console.log(await test2());
    res.send(await test2());
});

app.get('/', (req, res) => {
    res.send('rota principal');
});

app.listen(env.PORT, () => {
    console.log('server on');
});