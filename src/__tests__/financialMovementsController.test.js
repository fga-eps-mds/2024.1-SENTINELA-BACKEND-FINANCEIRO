const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("../routes");
const financialMovementsModel = require("../Models/financialMovementsSchema");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = express();
let mongoServer;

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
}, 30000);

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
}, 30000);

describe("FinancialMovements Controller Tests", () => {
    let financialId;

    it("should create a new financial movement", async () => {
        const res = await request(app)
            .post("/financialMovements/create")
            .send({
                financialData: {
                    contaOrigem: "Fornecedor",
                    contaDestino: "Sindicato",
                    nomeOrigem: "Techsolutions",
                    nomeDestino: "Conta BRB",
                    tipoDocumento: "Patrocínio",
                    valorBruto: "20000.00",
                    formaDePagamento: "PIX",
                    dataDeVencimento: "28/11/2023",
                    dataDePagamento: "26/11/2023",
                },
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.nome).toBe("Test Financial Movements");

        financialId = res.body._id;
    });

    it("should get financial movement by id", async () => {
        const res = await request(app).get(
            "/financialMovements/${financialId}"
        );

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty(
            "financialData.contaOrigem",
            "Fornecedor"
        );
    });

    it("should get financial movements", async () => {
        const financialMovementsModelCount =
            await financialMovementsModel.countDocuments({});
        const res = await request(app).get("/financialMovements");

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(financialMovementsModelCount);
    });

    it("should delete financial movement", async () => {
        const res = await request(app).delete(
            "/financialMovements/delete/${financialId}"
        );

        expect(res.status).toBe(200);

        const checkFMovements = await request(app).get(
            `/financialMovements/${financialId}`
        );
        expect(checkFMovements.status).toBe(404);
    });

    it("should update financial movement", async () => {
        const res = await request(app)
            .patch("/financialMovements/update/${financialId}")
            .send({ financialData: { contaOrigem: "Fornecedor" } });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty(
            "financialData.contaOrigem",
            "Sindicalizado"
        );
    });
});
