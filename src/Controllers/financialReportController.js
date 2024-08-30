const path = require("path");
const FinancialMovements = require("../Models/financialMovementsSchema");
const { generateFinancialReportPDF } = require("../Models/pdfGenerator");
const { generateFinancialReportCSV } = require("../Models/csvGenerator");
const fs = require("fs");

const ensureDirectoryExistence = (filePath) => {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
};

const sendAndDeleteFile = (res, filePath, contentType) => {
    res.setHeader("Content-Type", contentType);
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=${path.basename(filePath)}`
    );
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("Erro ao enviar o arquivo:", err);
            res.status(500).send("Erro ao enviar o arquivo.");
        } else {
            fs.unlinkSync(filePath); // Remover arquivo após envio
        }
    });
};

const generateFinancialReport = async (req, res) => {
    try {
        console.log(
            "Iniciando o processo de geração de relatório financeiro..."
        );

        const {
            contaOrigem,
            contaDestino,
            nomeOrigem,
            nomeDestino,
            tipoDocumento,
            sitPagamento,
            formArquivo,
            dataInicio,
            dataFinal,
        } = req.body;

        // Construir a consulta incluindo contaOrigem e contaDestino
        const query = {
            ...(nomeOrigem && { nomeOrigem }),
            ...(contaOrigem && { contaOrigem }),
            ...(contaDestino && { contaDestino }),
            ...(tipoDocumento && { tipoDocumento }),
            ...(nomeDestino && { nomeDestino }),
            ...(sitPagamento && { sitPagamento }),
            ...(dataInicio && {
                datadePagamento: { $gte: new Date(dataInicio) },
            }),
            ...(dataFinal && {
                datadeVencimento: { $lte: new Date(dataFinal) },
            }),
        };

        console.log("Consulta gerada para o banco de dados:", query);

        const financialMovements = await FinancialMovements.find(query);

        console.log(
            "Movimentações financeiras encontradas:",
            financialMovements.length
        );

        if (financialMovements.length === 0) {
            return res
                .status(404)
                .send("Nenhuma movimentação financeira encontrada.");
        }

        let filePath;
        if (formArquivo === "PDF") {
            filePath = path.join(
                __dirname,
                `../../PDF`,
                `financial_report.pdf`
            );
            ensureDirectoryExistence(filePath);
            await generateFinancialReportPDF(financialMovements, filePath);
            sendAndDeleteFile(res, filePath, "application/pdf");
        } else if (formArquivo === "CSV") {
            filePath = path.join(
                __dirname,
                `../../CSV`,
                `financial_report.csv`
            );
            ensureDirectoryExistence(filePath);
            await generateFinancialReportCSV(financialMovements, filePath);
            sendAndDeleteFile(res, filePath, "text/csv");
        } else {
            res.status(400).send("Formato de arquivo inválido.");
        }
    } catch (error) {
        console.error("Erro ao gerar o relatório financeiro:", error);
        res.status(500).send("Erro ao gerar o relatório financeiro.");
    }
};

module.exports = { generateFinancialReport };
