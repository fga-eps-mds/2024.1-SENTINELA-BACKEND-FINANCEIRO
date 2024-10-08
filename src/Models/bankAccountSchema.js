const mongoose = require("mongoose"); // Import mongoose

const bankAccountSchema = new mongoose.Schema({
    // Criação do schema
    name: {
        type: String,
        required: true,
        unique: true,
    },
    bank: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        required: true,
        enum: ["Conta Corrente", "Poupança", "Investimento", "Caixa"],
    },
    accountNumber: {
        type: String,
        required: false,
    },
    dv: {
        type: Number,
        required: false,
    },
    status: {
        type: String,
        required: true,
        enum: ["Ativo", "Inativo"],
    },
    agency: {
        type: String,
        required: false,
    },
    pix: {
        type: String,
        required: false,
    },
});

const BankAccount = mongoose.model("BankAccount", bankAccountSchema); // Criação do modelo a partir do schema
module.exports = BankAccount; // Exportação do modelo
