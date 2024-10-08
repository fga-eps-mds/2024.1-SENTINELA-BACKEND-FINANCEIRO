const fs = require("fs");
const {
    generateFinancialReportCSV,
    formatNumericDate,
} = require("../Models/csvGenerator");
const { parse } = require("json2csv");

jest.mock("fs");
jest.mock("json2csv", () => ({
    parse: jest.fn(),
}));

describe("generateFinancialReportCSV", () => {
    const mockFinancialMovements = [
        {
            contaOrigem: "1234",
            contaDestino: "5678",
            nomeOrigem: "Empresa A",
            nomeDestino: "Empresa B",
            tipoDocumento: "Fatura",
            valorBruto: 1000,
            valorLiquido: 900,
            formadePagamento: "Boleto",
            datadeVencimento: "2024-01-01T00:00:00.000Z",
            datadePagamento: "2024-01-10T00:00:00.000Z",
            baixada: true,
            descricao: "Pagamento de serviços",
        },
    ];

    const mockCsv = `"Tipo Documento","Valor Bruto","Valor Líquido","Conta Origem","Nome Origem","Conta Destino","Nome Destino","Data de Vencimento","Data de Pagamento","Forma de Pagamento","Situação de Pagamento","Descrição"
"Fatura",1000,900,"1234","Empresa A","5678","Empresa B","01/01/2024","10/01/2024","Boleto","Pago","Pagamento de serviços"`;

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

    beforeEach(() => {
        fs.writeFileSync.mockClear();
        parse.mockClear();
        parse.mockReturnValue(mockCsv);
    });

    it("deve gerar e salvar o arquivo CSV corretamente com os campos incluídos", async () => {
        const filePath = "/caminho/para/arquivo.csv";

        await generateFinancialReportCSV(
            mockFinancialMovements,
            filePath,
            includeFields
        );

        expect(parse).toHaveBeenCalledWith(mockFinancialMovements, {
            fields: expect.any(Array),
        });
        expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, mockCsv);
    });

    it("deve rejeitar se houver um erro ao gerar o CSV", async () => {
        const filePath = "/caminho/para/arquivo.csv";
        const mockError = new Error("Erro ao gerar CSV");
        parse.mockImplementationOnce(() => {
            throw mockError;
        });

        await expect(
            generateFinancialReportCSV(
                mockFinancialMovements,
                filePath,
                includeFields
            )
        ).rejects.toThrow("Erro ao gerar CSV");

        expect(fs.writeFileSync).not.toHaveBeenCalled();
    });

    describe("formatNumericDate", () => {
        it("deve formatar uma data válida no formato DD/MM/YYYY", () => {
            const date = "2024-01-10T00:00:00.000Z";
            const formattedDate = formatNumericDate(date);
            expect(formattedDate).toBe("10/01/2024");
        });

        it("deve retornar uma string vazia se a data for inválida", () => {
            const formattedDate = formatNumericDate(null);
            expect(formattedDate).toBe("");
        });

        it("deve lidar corretamente com uma data do tipo Date", () => {
            const date = new Date("2024-01-10T00:00:00.000Z");
            const formattedDate = formatNumericDate(date);
            expect(formattedDate).toBe("10/01/2024");
        });

        it("deve lidar corretamente com uma string de data no formato local", () => {
            const date = "2024-01-10";
            const formattedDate = formatNumericDate(date);
            expect(formattedDate).toBe("10/01/2024");
        });
    });
});
