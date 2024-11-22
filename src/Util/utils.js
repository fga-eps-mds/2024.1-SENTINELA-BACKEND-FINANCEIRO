const validator = (dados) => {
    if (typeof dados.nome !== "string" || dados.nome === "") {
        return "Nome ou Razão social inválidos";
    }

    if (dados.tipoPessoa) {
        console.log("TipoPessoa");
        const tipoPessoaValidas = ["Jurídica", "Física", ""];
        if (!tipoPessoaValidas.includes(dados.tipoPessoa)) {
            return "Tipo de pessoa inválida";
        }
    }

    if (dados.cpfCnpj) {
        const cpfValido = /^(\d{3}\.\d{3}\.\d{3}-\d{2})$/;
        const cnpjValido = /^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/;
        if (
            (!cpfValido.test(dados.cpfCnpj) && dados.tipoPessoa === "Física") ||
            (!cnpjValido.test(dados.cpfCnpj) && dados.tipoPessoa === "Jurídica")
        ) {
            return "CPF ou CNPJ inválido";
        }
    }

    if (dados.statusFornecedor) {
        const statusFornecedorValido = ["Ativo", "Inativo", ""];
        if (!statusFornecedorValido.includes(dados.statusFornecedor)) {
            return "Status de fornecedor inválido";
        }
    }

    if (dados.naturezaTransacao) {
        const tipoTransacaoValida = ["Receita", "Despesa", ""];
        if (!tipoTransacaoValida.includes(dados.naturezaTransacao)) {
            return "Tipo de transação inválida";
        }
    }

    if (dados.email) {
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValido.test(dados.email)) {
            return "E-mail inválido";
        }
    }

    if (dados.nomeContato) {
        if (typeof dados.nomeContato !== "string") {
            return "Nome de contato inválido";
        }
    }

    if (dados.celular) {
        const celularValido = /^\(\d{2}\) \d{5}-\d{4}$/;
        if (!celularValido.test(dados.celular)) {
            return "Número de celular inválido";
        }
    }

    if (dados.telefone) {
        const telefoneValido = /^\(\d{2}\) \d{4}-\d{4}$/;
        if (!telefoneValido.test(dados.telefone)) {
            return "Número de telefone inválido";
        }
    }

    if (dados.cep) {
        const cepValido = /^\d{5}-\d{3}$/;
        if (!cepValido.test(dados.cep)) {
            return "Cep inválido";
        }
    }

    if (dados.cidade) {
        if (typeof dados.cidade !== "string") {
            return "Cidade inválida";
        }
    }

    if (dados.uf_endereco) {
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

    if (dados.logradouro) {
        const logradouro = /^[a-zA-Z0-9\s,.()-]{5,100}$/;
        if (!logradouro.test(dados.logradouro)) {
            return "Logradouro inválido. Deve conter entre 5 e 100 caracteres.";
        }
    }

    if (dados.complemento) {
        if (typeof dados.complemento !== "string") {
            return "Complemento inválido";
        }
    }

    if (dados.agencia) {
        if (typeof dados.agencia !== "string") {
            return "Agência inválida";
        }
    }

    if (dados.numeroBanco) {
        const numeroValido = /^\d*$/;
        if (!numeroValido.test(dados.numeroBanco)) {
            return "Número inválido";
        }
    }

    if (dados.dv) {
        const dvValido = /^\d*$/;
        if (!dvValido.test(dados.dv)) {
            return "DV inválido";
        }
    }

    if (dados.chavePix) {
        if (typeof dados.chavePix !== "string") {
            return "Chave Pix inválida";
        }
    }

    return null;
};

module.exports = {
    validator,
};
