const validator = (dados) => {
  console.log("Validator");
  if (typeof dados.nome !== "string" || dados.nome === "") {
    return "Nome ou Razão social inválidos";
  }

  const tipoPessoaValidas = ["Jurídica", "Física"];
  if (!tipoPessoaValidas.includes(dados.tipoPessoa)) {
    return "Tipo de pessoa inválida";
  }

  const cpfValido = /^(\d{3}.\d{3}.\d{3}-\d{2})$/;
  const cnpjValido = /^(\d{2}.\d{3}.\d{3}\/\d{4}-\d{2})$/;
  if (
    (!cpfValido.test(dados.cpfCnpj) && dados.tipoPessoa === "Física") ||
    (!cnpjValido.test(dados.cpfCnpj) && dados.tipoPessoa === "Jurídica")
  ) {
    return "CPF ou CNPJ inválido";
  }

  const statusFornecedorValido = ["Ativo", "Inativo"];
  if (!statusFornecedorValido.includes(dados.statusFornecedor)) {
    return "Status de fornecedor inválido";
  }

  const tipoTransacaoValida = ["Receita", "Despesa"];
  if (!tipoTransacaoValida.includes(dados.naturezaTransacao)) {
    return "Tipo de transação inválida";
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailValido.test(dados.email)) {
    return "E-mail inválido";
  }

  if (typeof dados.nomeContato !== "string" || dados.nomeContato === "") {
    return "Nome de contato inválido";
  }

  const celularValido = /^\(\d{2}\) \d{5}-\d{4}$/;
  if (!celularValido.test(dados.celular)) {
    return "Número de celular inválido";
  }
  
  const telefoneValido = /^\(\d{2}\) \d{4}-\d{4}$/;
  if (!telefoneValido.test(dados.telefone)) {
    return "Número de telefone inválido";
  }

  const cepValido = /^\d{5}-\d{3}$/;
  if (!cepValido.test(dados.cep) || dados.cep === "") {
    return "Cep inválido";
  }

  if (typeof dados.cidade !== "string" || dados.cidade === "") {
    return "Cidade inválida";
  }

  const ufsValidos = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
  if (!ufsValidos.includes(dados.uf_endereco)) {
    return "UF inválida";
  }

  const logradouro = /^[a-zA-Z0-9\s,.()-]{5,100}$/;
  if (!logradouro.test(dados.logradouro)) {
    return "Logradouro inválido. Deve conter entre 5 e 100 caracteres.";
  }

  if (typeof dados.complemento !== "string" || dados.complemento === "") {
    return "Complemento inválido";
  }

  if (typeof dados.agencia !== "string" || dados.agencia === "") {
    return "Agência inválida";
  }

  const numeroValido = /^\d*$/;
  if (!numeroValido.test(dados.numeroBanco) || dados.numeroBanco === "") {
    return "Número inválido";
  } 

  const dvValido = /^\d*$/;
  if (!dvValido.test(dados.dv) || dados.dv === "") {
    return "DV inválido";
  }

  if (typeof dados.chavePix !== "string" || dados.chavePix === "") {
    return "Chave Pix inválida";
  }
  
  return null;
};

module.exports = {
  validator,
};
