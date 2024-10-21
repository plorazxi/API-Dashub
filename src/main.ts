import express from "express";
require('dotenv').config();

const env = process.env;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('rota principal');
});

app.listen(env.PORT, () => {
    console.log('server on');
});