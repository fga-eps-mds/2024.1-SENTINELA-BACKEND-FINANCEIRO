const mongoose = require("mongoose");

const supplierFormSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true,
    },
    tipoPessoa: {
        type: String,
        enum: ["Jurídica", "Física", ""],
    },
    cpfCnpj: {
        type: String,
    },
    statusFornecedor: {
        type: String,
        enum: ["Ativo", "Inativo", ""],
    },
    naturezaTransacao: {
        type: String,
        enum: ["Receita", "Despesa", ""],
    },
    email: {
        type: String,
    },
    nomeContato: {
        type: String,
    },
    celular: {
        type: String,
    },
    telefone: {
        type: String,
    },
    cep: {
        type: String,
    },
    cidade: {
        type: String,
    },
    uf_endereco: {
        type: String,
        enum: [
            "AC",
            "AL",
            "AP",
            "AM",
            "BA",
            "CE",
            "DF",
            "ES",
            "GO",
            "MA",
            "MT",
            "MS",
            "MG",
            "PA",
            "PB",
            "PR",
            "PE",
            "PI",
            "RJ",
            "RN",
            "RS",
            "RO",
            "RR",
            "SC",
            "SP",
            "SE",
            "TO",
            "",
        ],
    },
    logradouro: {
        type: String,
    },
    complemento: {
        type: String,
    },
    nomeBanco: {
        type: String,
    },
    agencia: {
        type: String,
    },
    numeroBanco: {
        type: String,
    },
    dv: {
        type: String,
    },
    chavePix: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const supplierForm = mongoose.model("Supplier", supplierFormSchema);
module.exports = supplierForm;
