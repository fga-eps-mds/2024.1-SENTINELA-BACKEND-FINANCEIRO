const fs = require("fs");
const { parse } = require("json2csv");

const formatNumericDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getUTCDate()).padStart(2, "0");
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const year = d.getUTCFullYear();
    return `${day}/${month}/${year}`;
};

const generateFinancialReportCSV = (
    financialMovements,
    filePath,
    includeFields
) => {
    return new Promise((resolve, reject) => {
        try {
            // Define todos os campos possíveis
            const allFields = {
                contaOrigem: { label: "Conta Origem", value: "contaOrigem" },
                contaDestino: { label: "Conta Destino", value: "contaDestino" },
                nomeOrigem: { label: "Nome Origem", value: "nomeOrigem" },
                nomeDestino: { label: "Nome Destino", value: "nomeDestino" },
                tipoDocumento: {
                    label: "Tipo Documento",
                    value: "tipoDocumento",
                },
                valorBruto: { label: "Valor Bruto", value: "valorBruto" },
                valorLiquido: { label: "Valor Líquido", value: "valorLiquido" },
                formaPagamento: {
                    label: "Forma de Pagamento",
                    value: "formadePagamento",
                },
                dataVencimento: {
                    label: "Data de Vencimento",
                    value: (row) => formatNumericDate(row.datadeVencimento),
                },
                dataPagamento: {
                    label: "Data de Pagamento",
                    value: (row) => formatNumericDate(row.datadePagamento),
                },
                sitPagamento: {
                    label: "Situação de Pagamento",
                    value: (row) => (row.baixada ? "Pago" : "Não pago"),
                },
                descricao: { label: "Descrição", value: "descricao" },
            };

            // Filtra os campos com base no array `includeFields`
            const fields = includeFields
                .filter((field) => allFields[field]) // Filtra para pegar apenas os campos selecionados
                .map((field) => allFields[field]); // Mapeia para o formato necessário pelo `json2csv`

            // Gera o CSV com os campos filtrados
            const csv = parse(financialMovements, { fields });

            fs.writeFileSync(filePath, csv);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { generateFinancialReportCSV, formatNumericDate };
