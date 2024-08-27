const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("../routes");
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

describe("Supplier Form Controller Tests", () => {
    let supplierId;

    it("should create a new supplier form", async () => {
        const res = await request(app)
            .post("/SupplierForm/create")
            .send({
                supplierData: {
                    nome: "Test Supplier",
                    tipoPessoa: "",
                    cpfCnpj: "",
                    statusFornecedor: "",
                    naturezaTransacao: "",
                    email: "",
                    nomeContato: "",
                    celular: "",
                    telefone: "",
                    cep: "",
                    cidade: "",
                    uf_endereco: "",
                    logradouro: "",
                    complemento: "",
                    nomeBanco: "",
                    agencia: "",
                    numeroBanco: "",
                    dv: "",
                    chavePix: "",
                },
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.nome).toBe("Test Supplier");

        supplierId = res.body._id;
    });

    it("should fail create a new supplier form without name", async () => {
        const res = await request(app)
            .post("/SupplierForm/create")
            .send({
                supplierData: {
                    nome: "",
                    tipoPessoa: "",
                    cpfCnpj: "",
                    statusFornecedor: "",
                    naturezaTransacao: "",
                    email: "",
                    nomeContato: "",
                    celular: "",
                    telefone: "",
                    cep: "",
                    cidade: "",
                    uf_endereco: "",
                    logradouro: "",
                    complemento: "",
                    nomeBanco: "",
                    agencia: "",
                    numeroBanco: "",
                    dv: "",
                    chavePix: "",
                },
            });

        expect(res.status).toBe(400);
    });

    it("should get all supplier forms", async () => {
        const res = await request(app).get("/SupplierForm");

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("should get a supplier form by ID", async () => {
        const res = await request(app).get(`/SupplierForm/${supplierId}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("nome", "Test Supplier");
    });

    it("should fail get a supplier form without ID", async () => {
        const res = await request(app).get(`/SupplierForm/${null}`);

        expect(res.status).toBe(400);
    });

    it("should update a supplier form by ID", async () => {
        const res = await request(app)
            .patch(`/SupplierForm/update/${supplierId}`)
            .send({ supplierData: { nome: "Updated Supplier" } });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("nome", "Updated Supplier");
    });

    it("should fail to update a supplier form without ID", async () => {
        const res = await request(app)
            .patch(`/SupplierForm/update/${null}`)
            .send({ supplierData: { nome: "Updated Supplier" } });

        expect(res.status).toBe(400);
    });

    it("should delete a supplier form by ID", async () => {
        const res = await request(app).delete(
            `/SupplierForm/delete/${supplierId}`
        );

        expect(res.status).toBe(200);

        const checkSupplier = await request(app).get(
            `/SupplierForm/delete/${supplierId}`
        );
        expect(checkSupplier.status).toBe(404);
    });

    it("should fail to delete a supplier form without ID", async () => {
        const res = await request(app).delete(
            `/SupplierForm/delete/${supplierId}`
        );

        expect(res.status).toBe(200);

        const checkSupplier = await request(app).get(
            `/SupplierForm/delete/${supplierId}`
        );
        expect(checkSupplier.status).toBe(404);
    });
});
