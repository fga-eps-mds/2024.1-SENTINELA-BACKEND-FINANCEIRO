const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const app = express();

const { NODE_ENV, MONGO_URI, OFFICIAL_MONGO_URI, PORT, FRONT_HOST } =
    process.env;

const corsOption = {
    origin: (origin, callback) => {
        const allowedOrigin = FRONT_HOST || "localhost";
        if (origin?.includes(allowedOrigin) || origin === undefined) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
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
    url = OFFICIAL_MONGO_URI;
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
