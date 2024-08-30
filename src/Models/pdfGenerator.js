const PDFDocument = require("pdfkit");
const fs = require("fs");

const formatDate = (date) => {
    if (!date) return "N/A";
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Date(date).toLocaleDateString("pt-BR", options);
};

const generateFinancialReportPDF = (financialMovements, filePath) => {
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

            doc.text(`Conta Origem: ${movement.contaOrigem}`);
            doc.text(`Conta Destino: ${movement.contaDestino}`);
            doc.text(`Nome Origem: ${movement.nomeOrigem}`);
            doc.text(`Nome Destino: ${movement.nomeDestino}`);
            doc.text(`Tipo Documento: ${movement.tipoDocumento}`);
            doc.text(`Valor Bruto: ${movement.valorBruto}`);
            doc.text(`Valor Líquido: ${movement.valorLiquido || "N/A"}`);
            doc.text(`Forma de Pagamento: ${movement.formadePagamento}`);
            doc.text(
                `Data de Vencimento: ${formatDate(movement.datadeVencimento)}`
            );
            doc.text(
                `Data de Pagamento: ${formatDate(movement.datadePagamento)}`
            );
            doc.text(
                `Situação de Pagamento: ${movement.baixada ? "Pago" : "Não pago"}`
            );
            doc.text(`Descrição: ${movement.descricao || "N/A"}`);

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
