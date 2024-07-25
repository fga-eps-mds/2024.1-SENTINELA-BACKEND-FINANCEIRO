const validator = (dados) => {
  console.log(dados);
  if (typeof dados.nome !== "string" || dados.nome === "") {
    return "Nome ou Razão social inválidos";
  }

  const formatarCpfCnpj = (valor) => {
    // Remove tudo o que não é dígito
    valor = valor.replace(/\D/g, "");
    // Verifica se é CPF (tem 11 dígitos) ou CNPJ (tem 14 dígitos)
    if (valor.length === 11) {
      valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (valor.length === 14) {
      valor = valor.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      );
    } else {
      // Caso não seja nem CPF nem CNPJ válido, retorna mensagem de CPF ou CNPJ inválidos
      return "CPF ou CNPJ inválidos";
    }

    return valor;
  };
  // Formata o CPF/CNPJ antes de validar
  if (dados.cpfCnpj) {
    dados.cpfCnpj = formatarCpfCnpj(dados.cpfCnpj);
  }
  // Validar CPF ou CNPJ formatado
  const cpfValido = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
  const cnpjValido = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
  if (!cpfValido.test(dados.cpfCnpj) && !cnpjValido.test(dados.cpfCnpj)) {
    return "CPF ou CNPJ inválidos";
  }

  const tipoPessoaValidas = ["Jurídica", "Física"];
  if (!tipoPessoaValidas.includes(dados.tipoPessoa)) {
    return "Tipo de pessoa inválida";
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

  const formatarCelular = (valor) => {
    // Remove tudo o que não é dígito
    valor = valor.replace(/\D/g, "");
    // Aplica a máscara (XX) XXXXX-XXXX
    valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    return valor;
  };
  // Formata o celular antes de validar
  if (dados.celular) {
    dados.celular = formatarCelular(dados.celular);
  }

  const formatarTelefone = (valor) => {
    // Remove tudo o que não é dígito
    valor = valor.replace(/\D/g, "");
    // Aplica a máscara (XX) XXXX-XXXX
    valor = valor.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
    return valor;
  };
  // Formata o telefone antes de validar
  if (dados.telefone) {
    dados.telefone = formatarTelefone(dados.telefone);
  }

  const formatarCep = (valor) => {
    // Remove tudo o que não é dígito
    valor = valor.replace(/\D/g, "");
    // Aplica a máscara XXXXX-XXX
    valor = valor.replace(/^(\d{5})(\d{3})$/, "$1-$2");
    return valor;
  };
  // Formata o CEP antes de validar
  if (dados.cep) {
    dados.cep = formatarCep(dados.cep);
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

  if (typeof dados.numeroBanco !== "number" || dados.numeroBanco === "") {
    return "Número inválido";
  }

  if (typeof dados.dv !== "number" || dados.dv === "") {
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
