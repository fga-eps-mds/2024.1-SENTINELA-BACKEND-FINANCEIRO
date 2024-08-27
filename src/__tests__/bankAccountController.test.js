const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const bankAccountRouter = require("../routes"); // Atualize o caminho para o arquivo de rotas

let mongoServer;
let app = express();

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    app.use(express.json());
    app.use("/", bankAccountRouter); // Atualize o prefixo da rota para '/finance'
}, 30000);

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe("BankAccount API", () => {
    it("should create a new bank account", async () => {
        const response = await request(app)
            .post("/finance/createBankAccount") // Atualize o caminho da rota
            .send({
                formData: {
                    name: "Conta Teste",
                    bank: "Banco Teste",
                    accountNumber: "12345678",
                    status: "Ativo",
                    accountType: "Conta Corrente",
                },
            });

        console.log("Create Response:", response); // Adicione um log para depuração

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("name", "Conta Teste");
    });

    it("should not create a bank account with an existing name", async () => {
        await request(app)
            .post("/finance/createBankAccount") // Atualize o caminho da rota
            .send({
                formData: {
                    name: "Conta Teste",
                    bank: "Banco Teste",
                    accountNumber: "12345678",
                    status: "Ativo",
                    accountType: "Conta Corrente",
                },
            });

        const response = await request(app)
            .post("/finance/createBankAccount") // Atualize o caminho da rota
            .send({
                formData: {
                    name: "Conta Teste",
                    bank: "Banco Teste",
                    accountNumber: "87654321",
                },
            });

        console.log("Conflict Response:", response.body); // Adicione um log para depuração

        expect(response.status).toBe(409);
        expect(response.body.error).toBe("Nome já cadastrado");
    });

    it("should not create a bank account with a blank name", async () => {
        const response = await request(app)
            .post("/finance/createBankAccount") // Atualize o caminho da rota
            .send({
                formData: {
                    name: "",
                    bank: "Banco Teste",
                    accountNumber: "12345678",
                    status: "Ativo",
                    accountType: "Conta Corrente",
                },
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Nome não fornecido");
    });

    it("should fetch a bank account by ID", async () => {
        const newAccount = await request(app)
            .post("/finance/createBankAccount") // Atualize o caminho da rota
            .send({
                formData: {
                    name: "Conta Teste ID",
                    bank: "Banco Teste ID",
                    accountNumber: "11111111",
                    status: "Ativo",
                    accountType: "Conta Corrente",
                },
            });

        const response = await request(app).get(
            `/finance/bankAccount/${newAccount.body._id}`
        ); // Atualize o caminho da rota

        console.log("Fetch By ID Response:", response.body); // Adicione um log para depuração

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Conta Teste ID");
    });

    it("should not fetch a bank account without ID", async () => {
        await request(app)
            .post("/finance/createBankAccount") // Atualize o caminho da rota
            .send({
                formData: {
                    name: "Conta Teste ID",
                    bank: "Banco Teste ID",
                    accountNumber: "11111111",
                    status: "Ativo",
                    accountType: "Conta Corrente",
                },
            });

        const response = await request(app).get(`/finance/bankAccount/${null}`); // Atualize o caminho da rota

        console.log("Fetch By ID Response:", response.body); // Adicione um log para depuração

        expect(response.status).toBe(500);
    });
    it("should fetch all bank accounts", async () => {
        await request(app)
            .post("/finance/createBankAccount") // Atualize o caminho da rota
            .send({
                formData: {
                    name: "Conta Teste 1",
                    bank: "Banco Teste 1",
                    accountNumber: "11111111",
                    status: "Ativo",
                    accountType: "Conta Corrente",
                },
            });

        await request(app)
            .post("/finance/createBankAccount") // Atualize o caminho da rota
            .send({
                formData: {
                    name: "Conta Teste 2",
                    bank: "Banco Teste 2",
                    accountNumber: "22222222",
                    status: "Ativo",
                    accountType: "Conta Corrente",
                },
            });

        const response = await request(app).get("/finance/getBankAccount"); // Atualize o caminho da rota

        console.log("Fetch All Response:", response.body); // Adicione um log para depuração

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    it("should update a bank account", async () => {
        const newAccount = await request(app)
            .post("/finance/createBankAccount") // Atualize o caminho da rota
            .send({
                formData: {
                    name: "Conta a ser Atualizada",
                    bank: "Banco Teste Atualização",
                    accountNumber: "22222222",
                    status: "Ativo",
                    accountType: "Conta Corrente",
                },
            });

        const response = await request(app)
            .patch(`/finance/updateBankAccount/${newAccount.body._id}`) // Atualize o caminho da rota
            .send({ name: "Conta Atualizada" });

        console.log("Update Response:", response.body); // Adicione um log para depuração

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Conta Atualizada");
    });

    it("should not update a bank account without id", async () => {
        await request(app)
            .post("/finance/createBankAccount") // Atualize o caminho da rota
            .send({
                formData: {
                    name: "Conta a ser Atualizada",
                    bank: "Banco Teste Atualização",
                    accountNumber: "22222222",
                    status: "Ativo",
                    accountType: "Conta Corrente",
                },
            });

        const response = await request(app)
            .patch(`/finance/updateBankAccount/${null}`) // Atualize o caminho da rota
            .send({ name: "Conta Atualizada" });

        console.log("Update Response:", response.body); // Adicione um log para depuração

        expect(response.status).toBe(400);
    });

    it("should delete a bank account", async () => {
        const newAccount = await request(app)
            .post("/finance/createBankAccount") // Atualize o caminho da rota
            .send({
                formData: {
                    name: "Conta a ser Deletada",
                    bank: "Banco Teste Deletar",
                    accountNumber: "33333333",
                    status: "Ativo",
                    accountType: "Conta Corrente",
                },
            });

        const response = await request(app).delete(
            `/finance/deleteBankAccount/${newAccount.body._id}`
        ); // Atualize o caminho da rota

        console.log("Delete Response:", response.body); // Adicione um log para depuração

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Conta deletada com sucesso");
    });
    it("should delete a bank account", async () => {
        const response = await request(app).delete(
            `/finance/deleteBankAccount/${null}`
        ); // Atualize o caminho da rota

        expect(response.status).toBe(500);
    });

    it("should return 404 if bank account is not found by ID", async () => {
        const invalidId = new mongoose.Types.ObjectId(); // Gerar um ID válido, mas que não está no banco

        const response = await request(app).get(
            `/finance/getBankAccountbyId/${invalidId}`
        );

        expect(response.status).toBe(404);
    });
});
