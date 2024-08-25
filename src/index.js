const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const app = express();

const {
    NODE_ENV,
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGO_URI,
    DB_HOST,
    PORT,
} = process.env;

const corsOption = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// Aplicar o middleware CORS antes das rotas
app.use(cors(corsOption));

// Middleware para parsear JSON
app.use(bodyParser.json());

// Conect to MongoB
let url;
if (NODE_ENV === "development") {
    url = MONGO_URI;
} else {
    url = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${DB_HOST}`;
}

mongoose
    .connect(url)
    .then(() => {
        console.log("Conectado ao MongoDB");

        // Rotas import
        app.use(routes);

        // Route test
        app.get("/", (req, res) => {
            res.send("Hello, world!");
        });

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
            console.log("NODE_ENV:", NODE_ENV);
        });
    })
    .catch((err) => {
        console.error("Erro ao conectar ao MongoDB", err);
        process.exit(1);
    });

module.exports = app;
