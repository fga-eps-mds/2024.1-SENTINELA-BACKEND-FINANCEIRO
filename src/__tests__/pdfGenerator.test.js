const { generateFinancialReportPDF } = require("../Models/pdfGenerator");
const fs = require("fs");
const path = require("path");

describe("generateFinancialReportPDF", () => {
    const mockFinancialMovements = [
        {
            contaOrigem: "Conta A",
            contaDestino: "Conta B",
            nomeOrigem: "Nome Origem A",
            nomeDestino: "Nome Destino B",
            tipoDocumento: "Fatura",
            valorBruto: 1000.0,
            valorLiquido: 950.0,
            formadePagamento: "Boleto",
            datadeVencimento: "2024-08-31T00:00:00Z",
            datadePagamento: "2024-09-01T00:00:00Z",
            baixada: true,
            descricao: "Pagamento de fatura",
        },
    ];

    const outputPath = path.join(__dirname, "test-report.pdf");

    afterEach(() => {
        // Limpar o arquivo de teste após cada execução
        if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
        }
    });

    it("deve gerar um PDF com os campos selecionados e verificar o tamanho do arquivo", async () => {
        const includeFields = [
            "tipoDocumento",
            "valorBruto",
            "valorLiquido",
            "contaOrigem",
            "nomeOrigem",
            "contaDestino",
            "nomeDestino",
            "dataVencimento",
            "dataPagamento",
            "formaPagamento",
            "sitPagamento",
            "descricao",
        ];

        await generateFinancialReportPDF(
            mockFinancialMovements,
            outputPath,
            includeFields
        );

        // Verifique se o arquivo foi criado
        expect(fs.existsSync(outputPath)).toBe(true);

        // Obtenha o tamanho do arquivo
        const fileSize = fs.statSync(outputPath).size;

        // Verifique se o arquivo não está vazio e tem um tamanho razoável
        expect(fileSize).toBeGreaterThan(0);
    });

    it("deve gerar um PDF com um subconjunto de campos selecionados", async () => {
        const includeFields = [
            "tipoDocumento",
            "valorBruto",
            "contaOrigem",
            "nomeDestino",
        ];

        await generateFinancialReportPDF(
            mockFinancialMovements,
            outputPath,
            includeFields
        );

        // Verifique se o arquivo foi criado
        expect(fs.existsSync(outputPath)).toBe(true);

        // Obtenha o tamanho do arquivo
        const fileSize = fs.statSync(outputPath).size;

        // Verifique se o arquivo não está vazio e tem um tamanho razoável
        expect(fileSize).toBeGreaterThan(0);
    });
});
