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

    it("deve gerar um PDF e verificar o tamanho do arquivo", async () => {
        await generateFinancialReportPDF(mockFinancialMovements, outputPath);

        // Verifique se o arquivo foi criado
        expect(fs.existsSync(outputPath)).toBe(true);

        // Obtenha o tamanho do arquivo
        const fileSize = fs.statSync(outputPath).size;

        // Verifique se o arquivo não está vazio e tem um tamanho razoável
        expect(fileSize).toBeGreaterThan(0);

        // Limpar o arquivo de teste
        fs.unlinkSync(outputPath);
    });
});
