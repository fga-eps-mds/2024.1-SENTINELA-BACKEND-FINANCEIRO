const fs = require("fs");
const { parse } = require("json2csv");

const generateFinancialReportCSV = (financialMovements, filePath) => {
    return new Promise((resolve, reject) => {
        try {
            const fields = [
                { label: "Conta Origem", value: "contaOrigem" },
                { label: "Conta Destino", value: "contaDestino" },
                { label: "Nome Origem", value: "nomeOrigem" },
                { label: "Nome Destino", value: "nomeDestino" },
                { label: "Tipo Documento", value: "tipoDocumento" },
                { label: "Valor Bruto", value: "valorBruto" },
                { label: "Valor Líquido", value: "valorLiquido" },
                { label: "Forma de Pagamento", value: "formadePagamento" },
                { label: "Data de Vencimento", value: "datadeVencimento" },
                { label: "Data de Pagamento", value: "datadePagamento" },
                {
                    label: "Situação de Pagamento",
                    value: (row) => (row.baixada ? "Pago" : "Não pago"),
                },
                { label: "Descrição", value: "descricao" },
            ];

            const csv = parse(financialMovements, { fields });

            fs.writeFileSync(filePath, csv);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { generateFinancialReportCSV };
