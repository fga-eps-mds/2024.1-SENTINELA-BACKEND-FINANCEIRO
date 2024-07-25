const validator = (dados) => {
  console.log("Validator");
  if (typeof dados.nome !== "string" || dados.nome === "") {
    console.log("Nome");
    return "Nome ou Razão social inválidos";
  }

  const tipoPessoaValidas = ["Jurídica", "Física"];
  if (!tipoPessoaValidas.includes(dados.tipoPessoa)) {
    console.log("Pessoa");
    return "Tipo de pessoa inválida";
  }

  const cpfValido = /^(\d{3}.\d{3}.\d{3}-\d{2})$/;
  const cnpjValido = /^(\d{2}.\d{3}.\d{3}\/\d{4}-\d{2})$/;
  if (
    (!cpfValido.test(dados.cpf) && dados.tipoPessoa === "Física") ||
    (!cnpjValido.test(dados.cpf) && dados.tipoPessoa === "Jurídica")
  ) {
    console.log("CPF");
    return "CPF ou CNPJ inválido";
  }

  const statusFornecedorValido = ["Ativo", "Inativo"];
  if (!statusFornecedorValido.includes(dados.statusFornecedor)) {
    console.log("Status");
    return "Status de fornecedor inválido";
  }

  const tipoTransacaoValida = ["Receita", "Despesa"];
  if (!tipoTransacaoValida.includes(dados.naturezaTransacao)) {
    console.log("Transação");
    return "Tipo de transação inválida";
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailValido.test(dados.email)) {
    console.log("Email");
    return "E-mail inválido";
  }

  if (typeof dados.nomeContato !== "string" || dados.nomeContato === "") {
    console.log("Nome Contato");
    return "Nome de contato inválido";
  }

  const celularValido = /^\d{2} \d{5}-\d{4}$/;
  if (!celularValido.test(dados.celular)) {
    console.log("Celular");
    return "Número de celular inválido";
  }
  
  const telefoneValido = /^\d{2} \d{4}-\d{4}$/;
  if (!telefoneValido.test(dados.telefone)) {
    console.log("Telefone");
    return "Número de telefone inválido";
  }

  const cepValido = /^\d{8}$/;
  if (!cepValido.test(dados.cep) || dados.cep === "") {
    console.log("CEP");
    return "Cep inválido";
  } else {
    dados.cep = Number(dados.cep);
  }

  if (typeof dados.cidade !== "string" || dados.cidade === "") {
    console.log("Cidade");
    return "Cidade inválida";
  }

  const ufsValidos = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
  if (!ufsValidos.includes(dados.uf_endereco)) {
    console.log("UF");
    return "UF inválida";
  }

  const logradouro = /^[a-zA-Z0-9\s,.()-]{5,100}$/;
  if (!logradouro.test(dados.logradouro)) {
    console.log("Logradouro");
    return "Logradouro inválido. Deve conter entre 5 e 100 caracteres.";
  }

  if (typeof dados.complemento !== "string" || dados.complemento === "") {
    console.log("Complemento");
    return "Complemento inválido";
  }

  if (typeof dados.agencia !== "string" || dados.agencia === "") {
    console.log("Agência");
    return "Agência inválida";
  }

  const numeroValido = /^\d*$/;
  if (!numeroValido.test(dados.numeroBanco) || dados.numeroBanco === "") {
    console.log("Número Bancário");
    return "Número inválido";
  } else {
    dados.numeroBanco = Number(dados.numeroBanco);
  }
  const dvValido = /^\d*$/;
  if (!dvValido.test(dados.dv) || dados.dv === "") {
    console.log("DV");
    return "DV inválido";
  } else {
    dados.dv = Number(dados.dv);
  }

  if (typeof dados.chavePix !== "string" || dados.chavePix === "") {
    console.log("PIX");
    return "Chave Pix inválida";
  }
  
  return null;
};

module.exports = {
  validator,
};
