const validator = (dados) => {
    console.log(dados);
    if (typeof dados.nome !== "string" || dados.nome === "") {
        return ("Nome ou Razão social inválidos" );
      }
  
      const tipoPessoaValidas = ["Jurídica", "Física"];
      if (!tipoPessoaValidas.includes(dados.tipoPessoa)) {
        return ("Tipo de pessoa inválida");
      }
  
      //if cpf
  
      const statusFornecedorValido = ["Ativo", "Inativo"];
      if (!statusFornecedorValido.includes(dados.statusFornecedor)) {
        return ("Status de fornecedor inválido");
      }
  
      const tipoTransacao = ["Receita", "Despesa"];
      if (!tipoTransacao.includes(dados.naturezaTransacao)) {
        return ("Tipo de transação inválida");
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(dados.email)) {
        return ("E-mail inválido");
      }
  
      if (
        typeof dados.nomeContato !== "string" ||
        dados.nomeContato === ""
      ) {
        return("Nome de contato inválido");
      }
  
      const celularValido = /^\d{2} \d{5}-\d{4}$/;
      if (!celularValido.test(dados.celular)) {
        return("Número de celular inválido");
      }
  
      const telefoneValido = /^\d{2} \d{4}-\d{4}$/;
      if (!telefoneValido.test(dados.telefone)) {
        return ( "Número de telefone inválido");
      }
  
      if (typeof dados.cep !== "number" || dados.cep === "") {
        return( "Cep inválido" );
      }
  
      if (typeof dados.cidade !== "string" || dados.cidade === "") {
        return ("Cidade inválida");
      }
  
      const ufsValidos = [
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
      ];
      if (!ufsValidos.includes(dados.uf_endereco)) {
        return (  "UF inválida" );
      } 
  
      const logradouroRegex = /^[a-zA-Z0-9\s,.()-]{5,100}$/;
      if (!logradouroRegex.test(dados.logradouro)) {
        return (
          "Logradouro inválido. Deve conter entre 5 e 100 caracteres."
        );
      }
  
      if (
        typeof dados.complemento !== "string" ||
        dados.complemento === ""
      ) {
        return ("Complemento inválido" );
      }
  
      if (typeof dados.agencia !== "string" || dados.agencia === "") {
        return ("Agência inválida");
      }
  
      if (
        typeof dados.numeroBanco !== "number" ||
        dados.numeroBanco === ""
      ) {
        return ( "Número inválido" );
      }
  
      if (typeof dados.dv !== "number" || dados.dv === "") {
        return ("DV inválido");
      }
  
      if (typeof dados.chavePix !== "string" || dados.chavePix === "") {
        return ("Chave Pix inválida");
      }
    
    return null
}

module.exports = {
    validator
}