const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("../routes");
const financialMovementsModel = require("../Models/financialMovementsSchema");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mockedFMovements = {
    contaOrigem: "Sindicato",
    contaDestino: "Sindicalizado",
    nomeOrigem: "Empresa A",
    nomeDestino: "Empresa B",
    tipoDocumento: "NF-e",
    valorBruto: 1000.0,
    formadePagamento: "PIX",
    datadeVencimento: new Date("2024-09-01"),
    datadePagamento: new Date("2024-08-31"),
};

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

describe("FinancialMovements Controller Tests", () => {
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    afterEach(async () => {
        await financialMovementsModel.deleteMany({});
    });

    /*it("should create a new financial movement", async () => {
        const res = await request(app)
            .post(`/financialMovements/create`)
            .send(mockedFMovements);

        expect(res.status).toBe(201);
    });*/

    it("should get financial movement by id", async () => {
        const { body: createdFMovements } = await request(app)
            .post("/financialMovements/create")
            .send({
                ...mockedFMovements,
                contaOrigem: "Get By ID Mock",
            });

        const res = await request(app).get(
            `/financialMovements/${createdFMovements._id}`
        );

        expect(res.body).toMatchObject(createdFMovements);
        expect(res.status).toBe(200);
    });

    it("should get financial movements", async () => {
        const financialMovementsModelCount =
            await financialMovementsModel.countDocuments({});
        const res = await request(app).get("/financialMovements");

        expect(res.body.length).toBe(financialMovementsModelCount);
        expect(res.status).toBe(200);
    });

    it("should delete financial movement", async () => {
        const { body: createdFMovements } = await request(app)
            .post("/financialMovements/create")
            .send({
                ...mockedFMovements,
                contaOrigem: "Delete By ID Mock",
            });

        const res = await request(app).delete(
            `/financialMovements/delete/${createdFMovements._id}`
        );

        expect(res.body).toMatchObject(createdFMovements);
        expect(res.status).toBe(200);
    });

    it("should update financial movement", async () => {
        const { body: createdFMovements } = await request(app)
            .post("/financialMovements/create")
            .send({
                ...mockedFMovements,
                contaOrigem: "Update By ID Mock",
            });

        const res = await request(app).patch(
            `/financialMovements/update/${createdFMovements._id}`
        );

        expect(res.status).toBe(200);
    });
});
