import express from 'express';
import cors from 'cors';
import rotaProfissional from './rotas/rotaProfissional.js';

const hostname = "0.0.0.0";
const porta = 4000;

//Servidor completo HTTP
const app = express();

app.use(cors({
    origin: "*"
}))

app.use(express.urlencoded({extended:true}));

//Preparar a aplicacao para manipular o formato JSON
app.use(express.json());

//Configurando a rota em que devera ser feita as requisicoes
app.use("/profissional", rotaProfissional);

//Confirmacao que o servidor estara escutando no hostname e porta definidos
app.listen(porta, hostname, () => {
    console.log("Servidor escutando em ", hostname, ":",  porta);
})
