import express from "express";
import { ENV } from "./env";
const auth = require('./routes/auth');
const dashboard = require('./routes/dashboard');

const app = express();

app.use(express.json());

// rotas auth
app.use('/auth', auth);

// rotas de dashboard
app.use('/dashboard', dashboard)

app.get('/', (req, res) => {
    res.send('rota principal');
});

app.listen( ENV.PORT, () => {
    console.log('server on');
});