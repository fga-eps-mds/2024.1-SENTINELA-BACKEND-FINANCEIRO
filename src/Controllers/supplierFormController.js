const SupplierForm = require("../Models/supplierFormSchema");

const createSupplierForm = async (req, res) => {
  try {
    console.log(req.body);

    if (typeof req.body.nome !== "string" || req.body.nome === "") {
      return res.status(400).json({ erro: "Nome ou Razão social inválidos" });
    }

    const tipoPessoaValidas = ["Jurídica", "Física"];
    if (!tipoPessoaValidas.includes(req.body.tipoPessoa)) {
      return res.status(400).json({ erro: "Tipo de pessoa inválida" });
    }

    //if cpf

    const statusFornecedorValido = ["Ativo", "Inativo"];
    if (!statusFornecedorValido.includes(req.body.statusFornecedor)) {
      return res.status(400).json({ erro: "Status de fornecedor inválido" });
    }

    const tipoTransacao = ["Receita", "Despesa"];
    if (!tipoTransacao.includes(req.body.naturezaTransacao)) {
      return res.status(400).json({ erro: "Tipo de transação inválida" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ erro: "E-mail inválido" });
    }

    if (
      typeof req.body.nomeContato !== "string" ||
      req.body.nomeContato === ""
    ) {
      return res.status(400).json({ erro: "Nome de contato inválido" });
    }

    const celularValido = /^\d{2} \d{5}-\d{4}$/;
    if (celularValido.test(req.body.celular)) {
      return res.status(400).json({ erro: "Número de celular inválido" });
    }

    const telefoneValido = /^\d{2} \d{4}-\d{4}$/;
    if (!telefoneValido.test(req.body.telefone)) {
      return res.status(400).json({ erro: "Número de telefone inválido" });
    }

    if (typeof req.body.cep !== "string" || req.body.cep === "") {
      return res.status(400).json({ erro: "Cep inválido" });
    }

    if (typeof req.body.cidade !== "string" || req.body.cidade === "") {
      return res.status(400).json({ erro: "Cidade inválida" });
    }

    const ufsValidos = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",];
    if (!ufsValidos.includes(req.body.uf_endereco)) {
      return res.status(400).json({ erro: "UF inválida" });
    }

    const logradouroRegex = /^[a-zA-Z0-9\s,.()-]{5,100}$/;
    if (!logradouroRegex.test(req.body.logradouro)) {
      return res.status(400).json({
          erro: "Logradouro inválido. Deve conter entre 5 e 100 caracteres.",
        });
    }

    if (typeof req.body.complemento !== "string" || req.body.complemento === "") {
        return res.status(400).json({ erro: "Complemento inválido" });
    }

    if (typeof req.body.agencia !== "string" || req.body.agencia === "") {
      return res.status(400).json({ erro: "Agência inválida" });
    }

    if (typeof req.body.numeroBanco !== "number" || req.body.numeroBanco === "") {
        return res.status(400).json({ erro: "Número inválido" });
    }

    if (typeof req.body.dv !== "number" || req.body.dv === "") {
      return res.status(400).json({ erro: "DV inválido" });
    }

    if (typeof req.body.chavePix !== "string" || req.body.chavePix === "") {
      return res.status(400).json({ erro: "Chave Pix inválida" });
    }

    const supplier = new SupplierForm(req.body);
    await supplier.save();
    return res.status(201).send(supplier);
    } catch(error) {
    return res.status(400).send(error);
    }
    
};

const getSupplierForm = async (req, res) => {
  try {
    const supplier = await SupplierForm.find({});
    return res.status(200).send(supplier);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  createSupplierForm,
  getSupplierForm,
};
