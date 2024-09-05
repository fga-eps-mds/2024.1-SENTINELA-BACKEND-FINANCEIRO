const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

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

        // Calcula o somatório dos valores líquidos
        const totalValorBruto = financialMovements.reduce((total, movement) => {
            return total + (movement.valorBruto || 0);
        }, 0);

        // Path to the logo
        const logoPath = path.join(__dirname, "../assets/sindpol-logo.png");
        const logoSize = 50;
        const marginRight = 30;
        const logoTopMargin = 30;

        doc.pipe(stream);

        // Function to add the logo to the top right of the current page
        const addLogo = () => {
            const logoXPosition = doc.page.width - marginRight - logoSize;
            doc.image(logoPath, logoXPosition, logoTopMargin, {
                width: logoSize,
                height: logoSize,
            });
        };

        // Add the logo to the first page
        addLogo();

        // Add the logo to each new page
        doc.on("pageAdded", addLogo);

        // Position the title text to align with the logo
        const textXPosition = marginRight; // Align the text on the left margin
        const titleYPosition = logoTopMargin + logoSize / 2 - 9; // Centered vertically with the logo
        doc.fontSize(18).text(
            "Relatório Financeiro",
            textXPosition,
            titleYPosition
        );

        // Add the total value below the title
        doc.fontSize(12).text(
            `Valor bruto total do período: R$ ${totalValorBruto.toFixed(2)}`,
            textXPosition,
            titleYPosition + 20
        );

        doc.moveDown();

        financialMovements.forEach((movement, index) => {
            doc.fontSize(12)
                .text(`Movimentação financeira #${index + 1}`, {
                    underline: true,
                })
                .moveDown();

            // Add the fields based on includeFields
            if (includeFields.includes("tipoDocumento")) {
                doc.text(`Tipo Documento: ${movement.tipoDocumento}`);
            }
            if (includeFields.includes("valorBruto")) {
                doc.text(`Valor Bruto: R$ ${movement.valorBruto}`);
            }
            if (includeFields.includes("valorLiquido")) {
                doc.text(`Valor Líquido: R$ ${movement.valorLiquido || "N/A"}`);
            }
            if (
                includeFields.includes("contaOrigem") ||
                includeFields.includes("nomeOrigem")
            ) {
                let contaOrigemText = includeFields.includes("contaOrigem")
                    ? `Conta Origem: ${movement.contaOrigem}`
                    : "";
                let nomeOrigemText = includeFields.includes("nomeOrigem")
                    ? `${movement.nomeOrigem}`
                    : "";
                if (contaOrigemText && nomeOrigemText) {
                    doc.text(`${contaOrigemText} - ${nomeOrigemText}`);
                } else if (contaOrigemText) {
                    doc.text(contaOrigemText);
                } else if (nomeOrigemText) {
                    doc.text(nomeOrigemText);
                }
            }
            if (
                includeFields.includes("contaDestino") ||
                includeFields.includes("nomeDestino")
            ) {
                let contaDestinoText = includeFields.includes("contaDestino")
                    ? `Conta Destino: ${movement.contaDestino}`
                    : "";
                let nomeDestinoText = includeFields.includes("nomeDestino")
                    ? `${movement.nomeDestino}`
                    : "";
                if (contaDestinoText && nomeDestinoText) {
                    doc.text(`${contaDestinoText} - ${nomeDestinoText}`);
                } else if (contaDestinoText) {
                    doc.text(contaDestinoText);
                } else if (nomeDestinoText) {
                    doc.text(nomeDestinoText);
                }
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
                const situacaoPagamento = movement.datadePagamento
                    ? "Pago"
                    : "Não pago";
                doc.text(`Situação de Pagamento: ${situacaoPagamento}`);
            }
            if (includeFields.includes("formaPagamento")) {
                doc.text(`Forma de Pagamento: ${movement.formadePagamento}`);
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
