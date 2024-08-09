const mongoose = require("mongoose");

const financialMovementsSchema = new mongoose.Schema({
    contaOrigem: {
        type: String,
        required: true,
    },
    contaDestino: {
        type: String,
        required: true,
    },
    tipoDocumento: {
        type: String,
        required: true,
    },
    cpfCnpj: {
        type: String,
        unique: true,
        immutable: true,
        sparse: true,
    },
    valorBruto: {
        type: Number,
        required: true,
    },
    valorLiquido: {
        type: Number,
    },
    acrescimo: {
        type: Number,
        min: 0,
    },
    desconto: {
        type: Number,
        min: 0,
    },
    formadePagamento: {
        type: String,
        enum: [
            "Cŕedito",
            "Débito",
            "PIX",
            "Dinheiro",
            "Boleto",
            "Cheque",
            "Depósito",
        ],
        required: true,
    },
    datadeVencimento: {
        type: Date,
        default: Date.now,
        required: true,
    },
    datadePagamento: {
        type: Date,
        default: Date.now,
        required: true,
    },
    baixada: {
        type: Boolean,
    },
    descricao: {
        type: String,
    },
});

const financialMovements = mongoose.model(
    "financialMovements",
    financialMovementsSchema
);
module.exports = financialMovements;