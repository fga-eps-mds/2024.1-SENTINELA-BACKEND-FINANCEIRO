const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const FinancialMovements = require("./Models/financialMovementsSchema");
const { generateFinancialReportPDF } = require("./Models/pdfGenerator");
const { generateFinancialReportCSV } = require("./Models/csvGenerator");

const app = express();

// Variáveis de ambiente
const { NODE_ENV, MONGO_URI, OFFICIAL_MONGO_URI, PORT } = process.env;

console.log("Ambiente:", NODE_ENV);
console.log("MONGO_URI:", MONGO_URI);
console.log("OFFICIAL_MONGO_URI:", OFFICIAL_MONGO_URI);

// Middleware
const allowedOrigins = [
    "http://localhost:5173",
    "https://devel--appsentinela.netlify.app",
    "https://appsentinela.netlify.app",
];
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
    })
);

app.use(bodyParser.json());

const getFinancialMovementsFromDatabase = async () => {
    try {
        const financialMovements = await FinancialMovements.find(); // Verifique se este modelo está correto
        return financialMovements;
    } catch (error) {
        console.error("Erro ao buscar movimentações financeiras:", error);
        throw error;
    }
};

app.get("/download-financial-report", async (req, res) => {
    try {
        const { format } = req.query;
        console.log("Format:", format);
        const financialMovements = await getFinancialMovementsFromDatabase();
        if (format === "PDF") {
            await generateFinancialReportPDF(financialMovements, res);
        } else if (format === "CSV") {
            await generateFinancialReportCSV(financialMovements, res);
        } else {
            res.status(400).send("Formato inválido. Use 'PDF' ou 'CSV'.");
        }
    } catch (error) {
        console.error("Erro ao gerar o relatório financeiro:", error);
        res.status(500).send("Erro ao gerar o relatório financeiro.");
    }
});

mongoose
    .connect(NODE_ENV === "development" ? MONGO_URI : OFFICIAL_MONGO_URI)
    .then(() => {
        console.log("Conectado ao MongoDB");
        app.use(routes);
        app.get("/", (req, res) => {
            res.send("Hello, world!");
        });
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Erro ao conectar ao MongoDB", err);
        process.exit(1);
    });
