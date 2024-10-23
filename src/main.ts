import express from "express";
import { ENV } from "./env";
const auth = require('./routes/auth');
const dash = require('./routes/dash');

const app = express();

app.use(express.json());

// rotas auth
app.use('/auth', auth);

// rotas dash
app.use('/dash', dash);

app.get('/', (req, res) => {
    res.send('rota principal');
});

app.listen( ENV.PORT, () => {
    console.log('server on');
});