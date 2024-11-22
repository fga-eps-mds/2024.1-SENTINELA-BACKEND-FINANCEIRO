const { validator } = require("../Util/utils");

describe("Supplier Data Validator", () => {
    it("should return an error for invalid nome", () => {
        const result = validator({ nome: "" });
        expect(result).toBe("Nome ou Razão social inválidos");
    });

    it("should return an error for invalid tipoPessoa", () => {
        const result = validator({ nome: "Valid Name", tipoPessoa: "Invalid" });
        expect(result).toBe("Tipo de pessoa inválida");
    });

    it("should return an error for invalid CPF", () => {
        const result = validator({
            nome: "Valid Name",
            tipoPessoa: "Jurídica",
            cpfCnpj: "123.456.789-10",
        });
        expect(result).toBe("CPF ou CNPJ inválido");
    });

    it("should return an error for invalid CNPJ", () => {
        const result = validator({
            nome: "Valid Name",
            tipoPessoa: "Física",
            cpfCnpj: "12.345.678/0001-99",
        });
        expect(result).toBe("CPF ou CNPJ inválido");
    });

    it("should return an error for invalid statusFornecedor", () => {
        const result = validator({
            nome: "Valid Name",
            statusFornecedor: "Invalid",
        });
        expect(result).toBe("Status de fornecedor inválido");
    });

    it("should return an error for invalid naturezaTransacao", () => {
        const result = validator({
            nome: "Valid Name",
            naturezaTransacao: "Invalid",
        });
        expect(result).toBe("Tipo de transação inválida");
    });

    it("should return an error for invalid email", () => {
        const result = validator({ nome: "Valid Name", email: "invalidemail" });
        expect(result).toBe("E-mail inválido");
    });

    it("should return an error for invalid nomeContato", () => {
        const result = validator({ nome: "Valid Name", nomeContato: 12345 });
        expect(result).toBe("Nome de contato inválido");
    });

    it("should return an error for invalid celular", () => {
        const result = validator({ nome: "Valid Name", celular: "1234567890" });
        expect(result).toBe("Número de celular inválido");
    });

    it("should return an error for invalid telefone", () => {
        const result = validator({ nome: "Valid Name", telefone: "12345678" });
        expect(result).toBe("Número de telefone inválido");
    });

    it("should return an error for invalid cep", () => {
        const result = validator({ nome: "Valid Name", cep: "12345-6789" });
        expect(result).toBe("Cep inválido");
    });

    it("should return an error for invalid cidade", () => {
        const result = validator({ nome: "Valid Name", cidade: 12345 });
        expect(result).toBe("Cidade inválida");
    });

    it("should return an error for invalid uf_endereco", () => {
        const result = validator({ nome: "Valid Name", uf_endereco: "XX" });
        expect(result).toBe("UF inválida");
    });

    it("should return an error for invalid logradouro", () => {
        const result = validator({ nome: "Valid Name", logradouro: "123" });
        expect(result).toBe(
            "Logradouro inválido. Deve conter entre 5 e 100 caracteres."
        );
    });

    it("should return an error for invalid complemento", () => {
        const result = validator({ nome: "Valid Name", complemento: 12345 });
        expect(result).toBe("Complemento inválido");
    });

    it("should return an error for invalid agencia", () => {
        const result = validator({ nome: "Valid Name", agencia: 12345 });
        expect(result).toBe("Agência inválida");
    });

    it("should return an error for invalid numeroBanco", () => {
        const result = validator({ nome: "Valid Name", numeroBanco: "ABC" });
        expect(result).toBe("Número inválido");
    });

    it("should return an error for invalid dv", () => {
        const result = validator({ nome: "Valid Name", dv: "ABC" });
        expect(result).toBe("DV inválido");
    });

    it("should return an error for invalid chavePix", () => {
        const result = validator({ nome: "Valid Name", chavePix: 12345 });
        expect(result).toBe("Chave Pix inválida");
    });

    it("should return null for valid data", () => {
        const result = validator({
            nome: "Valid Name",
            tipoPessoa: "Física",
            cpfCnpj: "123.456.789-10",
            statusFornecedor: "Ativo",
            naturezaTransacao: "Receita",
            email: "valid@example.com",
            nomeContato: "Valid Contact",
            celular: "(12) 34567-8910",
            telefone: "(12) 3456-7890",
            cep: "12345-678",
            cidade: "Valid City",
            uf_endereco: "SP",
            logradouro: "Rua dos Validos, 123",
            complemento: "Apto 45",
            agencia: "1234",
            numeroBanco: "5678",
            dv: "9",
            chavePix: "validpixkey",
        });
        expect(result).toBeNull();
    });
});
