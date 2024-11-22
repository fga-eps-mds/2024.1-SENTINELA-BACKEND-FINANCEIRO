const path = require("path");
const fs = require("fs");
const {
    generateFinancialReport,
} = require("../Controllers/financialReportController");
const { generateFinancialReportPDF } = require("../Models/pdfGenerator");
const { generateFinancialReportCSV } = require("../Models/csvGenerator");
const FinancialMovements = require("../Models/financialMovementsSchema");

jest.mock("../Models/pdfGenerator");
jest.mock("../Models/csvGenerator");
jest.mock("fs");

describe("generateFinancialReport Controller", () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                contaOrigem: "1234",
                contaDestino: "5678",
                nomeOrigem: "Empresa A",
                nomeDestino: "Empresa B",
                tipoDocumento: "Fatura",
                sitPagamento: "Pago",
                formArquivo: "PDF", // Pode ser "PDF" ou "CSV"
                dataInicio: "2024-01-01",
                dataFinal: "2024-12-31",
                includeFields: {
                    valorBruto: true,
                    valorLiquido: true,
                    formadePagamento: true,
                    datadeVencimento: true,
                    datadePagamento: true,
                    baixada: true,
                    descricao: true,
                },
            },
        };

        res = {
            setHeader: jest.fn(),
            sendFile: jest.fn((filePath, callback) => callback(null)),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        FinancialMovements.find = jest.fn().mockResolvedValue([
            {
                contaOrigem: "1234",
                contaDestino: "5678",
                nomeOrigem: "Empresa A",
                nomeDestino: "Empresa B",
                tipoDocumento: "Fatura",
                valorBruto: 1000,
                valorLiquido: 900,
                formadePagamento: "Boleto",
                datadeVencimento: new Date(),
                datadePagamento: new Date(),
                baixada: true,
                descricao: "Pagamento de serviços",
            },
        ]);
    });

    it("deve gerar um arquivo PDF e enviá-lo", async () => {
        req.body.formArquivo = "PDF";
        const filePath = path.join(__dirname, "../../PDF/financial_report.pdf");

        generateFinancialReportPDF.mockResolvedValueOnce();

        fs.createWriteStream.mockReturnValue({
            pipe: jest.fn(),
            on: jest.fn((event, callback) => {
                if (event === "finish") callback();
            }),
        });

        await generateFinancialReport(req, res);

        expect(generateFinancialReportPDF).toHaveBeenCalledWith(
            expect.any(Array),
            filePath,
            expect.arrayContaining([
                "contaOrigem",
                "contaDestino",
                "nomeOrigem",
                "nomeDestino",
                "valorBruto",
                "valorLiquido",
                "formadePagamento",
                "datadeVencimento",
                "datadePagamento",
                "baixada",
                "descricao",
            ])
        );
        expect(res.setHeader).toHaveBeenCalledWith(
            "Content-Type",
            "application/pdf"
        );
        expect(res.setHeader).toHaveBeenCalledWith(
            "Content-Disposition",
            expect.stringContaining("financial_report.pdf")
        );
        expect(res.sendFile).toHaveBeenCalledWith(
            filePath,
            expect.any(Function)
        );
        expect(fs.unlinkSync).toHaveBeenCalledWith(filePath);
    });

    it("deve gerar um arquivo CSV e enviá-lo", async () => {
        req.body.formArquivo = "CSV";
        const filePath = path.join(__dirname, "../../CSV/financial_report.csv");

        generateFinancialReportCSV.mockResolvedValueOnce();

        await generateFinancialReport(req, res);

        expect(generateFinancialReportCSV).toHaveBeenCalledWith(
            expect.any(Array),
            filePath,
            expect.arrayContaining([
                "contaOrigem",
                "contaDestino",
                "nomeOrigem",
                "nomeDestino",
                "valorBruto",
                "valorLiquido",
                "formadePagamento",
                "datadeVencimento",
                "datadePagamento",
                "baixada",
                "descricao",
            ])
        );
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "text/csv");
        expect(res.setHeader).toHaveBeenCalledWith(
            "Content-Disposition",
            expect.stringContaining("financial_report.csv")
        );
        expect(res.sendFile).toHaveBeenCalledWith(
            filePath,
            expect.any(Function)
        );
        expect(fs.unlinkSync).toHaveBeenCalledWith(filePath);
    });

    it("deve criar o diretório se não existir", async () => {
        req.body.formArquivo = "PDF";
        const filePath = path.join(__dirname, "../../PDF/financial_report.pdf");

        generateFinancialReportPDF.mockResolvedValueOnce();

        fs.existsSync.mockReturnValue(false);
        fs.mkdirSync.mockReturnValue();

        await generateFinancialReport(req, res);

        expect(fs.existsSync).toHaveBeenCalledWith(path.dirname(filePath));
        expect(fs.mkdirSync).toHaveBeenCalledWith(path.dirname(filePath), {
            recursive: true,
        });
    });

    it("deve retornar 404 se não houver movimentações financeiras", async () => {
        FinancialMovements.find.mockResolvedValueOnce([]);

        await generateFinancialReport(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith(
            "Nenhuma movimentação financeira encontrada."
        );
    });

    it("deve retornar 500 em caso de erro", async () => {
        FinancialMovements.find.mockRejectedValueOnce(
            new Error("Erro no banco de dados")
        );

        await generateFinancialReport(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
            "Erro ao gerar o relatório financeiro."
        );
    });

    it("deve retornar 400 se o formato do arquivo for inválido", async () => {
        req.body.formArquivo = "INVALID_FORMAT";

        await generateFinancialReport(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith("Formato de arquivo inválido.");
    });
});
