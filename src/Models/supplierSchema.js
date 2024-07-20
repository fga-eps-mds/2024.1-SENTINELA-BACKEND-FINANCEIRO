const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const supplierSchema = new mongoose.Schema({
    
  nome: {
      type: String,
      required: true,
      unique: true
  },
  tipoPessoa: {
      type: String,
      required: true,
      enum: ['Jurídica', 'Física']
  },
  cpf: {
      type: Number,
      required: true,
      unique: true
      //immutable: true
  },
  statusFornecedor: {
      type: String,
      required: true,
      enum: ['Ativo', 'Inativo']
  },
  naturezaTransacao: {
      type: String,
      required: true,
      enum: ['Receita', 'Despesa']
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  nomeContato: {
      type: String,
      required: true,
      unique: true
  },
  celular: {
      type: String,
      required: true
  },
  telefone: {
      type: String,
      required: true
  },
  cep: {
      type: Number,
      required: true
  },
  cidade: {
      type: String,
      required: true
  },
  uf_endereco: {
      type: String,
      required: true,
      enum: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']
  },
  logradouro: {
      type: String,
      required: true
  },
  complemento: {
      type: String
  },
  nomeBanco: {
      type: String,
      required: true
  },
  agencia: {
      type: string,
      required: true
  },
  numeroBanco: {
      type: Number,
      required: true,
      unique: true
  },
  dv: {
      type: Number,
      required: true,
      unique: true
  },
  chavePix: {
      type: String,
      required: true,
      unique: true
  }
})


const Supplier = mongoose.model('userSupplier', supplierSchema);
module.exports = Supplier;
