const validator = (dados) => {
    if (typeof dados.nome !== "string" || dados.nome === "") {
        return "Nome ou Razão social inválidos";
    }

    if (dados.tipoPessoa !== null) {
        const tipoPessoaValidas = ["Jurídica", "Física"];
        if (!tipoPessoaValidas.includes(dados.tipoPessoa)) {
            return "Tipo de pessoa inválida";
        }
    }

    if (dados.cpfCnpj !== null) {
        const cpfValido = /^(\d{3}\.\d{3}\.\d{3}-\d{2})$/;
        const cnpjValido = /^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/;
        if (
            (!cpfValido.test(dados.cpfCnpj) && dados.tipoPessoa === "Física") ||
            (!cnpjValido.test(dados.cpfCnpj) && dados.tipoPessoa === "Jurídica")
        ) {
            return "CPF ou CNPJ inválido";
        }
    }

    if (dados.statusFornecedor !== null) {
        const statusFornecedorValido = ["Ativo", "Inativo"];
        if (!statusFornecedorValido.includes(dados.statusFornecedor)) {
            return "Status de fornecedor inválido";
        }
    }

    if (dados.naturezaTransacao !== null) {
        const tipoTransacaoValida = ["Receita", "Despesa"];
        if (!tipoTransacaoValida.includes(dados.naturezaTransacao)) {
            return "Tipo de transação inválida";
        }
    }

    if (dados.email !== null) {
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValido.test(dados.email)) {
            return "E-mail inválido";
        }
    }

    if (dados.nomeContato !== null) {
        if (typeof dados.nomeContato !== "string") {
            return "Nome de contato inválido";
        }
    }

    if (dados.celular !== null) {
        const celularValido = /^\(\d{2}\) \d{5}-\d{4}$/;
        if (!celularValido.test(dados.celular)) {
            return "Número de celular inválido";
        }
    }

    if (dados.telefone !== null) {
        const telefoneValido = /^\(\d{2}\) \d{4}-\d{4}$/;
        if (!telefoneValido.test(dados.telefone)) {
            return "Número de telefone inválido";
        }
    }

    if (dados.cep !== null) {
        const cepValido = /^\d{5}-\d{3}$/;
        if (!cepValido.test(dados.cep)) {
            return "Cep inválido";
        }
    }

    if (dados.cidade !== null) {
        if (typeof dados.cidade !== "string") {
            return "Cidade inválida";
        }
    }

    if (dados.uf_endereco !== null) {
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
            return "UF inválida";
        }
    }

    if (dados.logradouro !== null) {
        const logradouro = /^[a-zA-Z0-9\s,.()-]{5,100}$/;
        if (!logradouro.test(dados.logradouro)) {
            return "Logradouro inválido. Deve conter entre 5 e 100 caracteres.";
        }
    }

    if (dados.complemento !== null) {
        if (typeof dados.complemento !== "string") {
            return "Complemento inválido";
        }
    }

    if (dados.agencia !== null) {
        if (typeof dados.agencia !== "string") {
            return "Agência inválida";
        }
    }

    if (dados.numeroBanco !== null) {
        const numeroValido = /^\d*$/;
        if (!numeroValido.test(dados.numeroBanco)) {
            return "Número inválido";
        }
    }

    if (dados.dv !== null) {
        const dvValido = /^\d*$/;
        if (!dvValido.test(dados.dv)) {
            return "DV inválido";
        }
    }

    if (dados.chavePix !== null) {
        if (typeof dados.chavePix !== "string") {
            return "Chave Pix inválida";
        }
    }

    return null;
};

module.exports = {
    validator,
};
