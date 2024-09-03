const PDFDocument = require("pdfkit");
const fs = require("fs");

const formatDate = (date) => {
    if (!date) return "N/A";
    const options = {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };
    return new Date(date).toLocaleDateString("pt-BR", options);
};

const generateFinancialReportPDF = (
    financialMovements,
    filePath,
    includeFields
) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 30 });
        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);

        doc.fontSize(18).text("Relatório Financeiro", { align: "center" });
        doc.moveDown();

        financialMovements.forEach((movement, index) => {
            doc.fontSize(12)
                .text(`Movimento #${index + 1}`, { underline: true })
                .moveDown();

            // Adicione os campos com base no `includeFields`
            if (includeFields.includes("contaOrigem")) {
                doc.text(`Conta Origem: ${movement.contaOrigem}`);
            }
            if (includeFields.includes("contaDestino")) {
                doc.text(`Conta Destino: ${movement.contaDestino}`);
            }
            if (includeFields.includes("nomeOrigem")) {
                doc.text(`Nome Origem: ${movement.nomeOrigem}`);
            }
            if (includeFields.includes("nomeDestino")) {
                doc.text(`Nome Destino: ${movement.nomeDestino}`);
            }
            if (includeFields.includes("tipoDocumento")) {
                doc.text(`Tipo Documento: ${movement.tipoDocumento}`);
            }
            if (includeFields.includes("valorBruto")) {
                doc.text(`Valor Bruto: ${movement.valorBruto}`);
            }
            if (includeFields.includes("valorLiquido")) {
                doc.text(`Valor Líquido: ${movement.valorLiquido || "N/A"}`);
            }
            if (includeFields.includes("formaPagamento")) {
                doc.text(`Forma de Pagamento: ${movement.formadePagamento}`);
            }
            if (includeFields.includes("dataVencimento")) {
                doc.text(
                    `Data de Vencimento: ${formatDate(movement.datadeVencimento)}`
                );
            }
            if (includeFields.includes("dataPagamento")) {
                doc.text(
                    `Data de Pagamento: ${formatDate(movement.datadePagamento)}`
                );
            }
            if (includeFields.includes("sitPagamento")) {
                doc.text(
                    `Situação de Pagamento: ${movement.baixada ? "Pago" : "Não pago"}`
                );
            }
            if (includeFields.includes("descricao")) {
                doc.text(`Descrição: ${movement.descricao || "N/A"}`);
            }

            doc.moveDown();
        });

        doc.end();

        stream.on("finish", () => {
            resolve();
        });

        stream.on("error", (err) => {
            reject(err);
        });
    });
};

module.exports = { generateFinancialReportPDF };
