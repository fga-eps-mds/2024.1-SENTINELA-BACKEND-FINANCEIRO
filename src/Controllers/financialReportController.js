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

const generateFinancialReport = async (req, res) => {
    try {
        console.log(
            "Iniciando o processo de geração de relatório financeiro..."
        );

        const {
            fornecedor,
            tipoLancamento,
            tipoDocumento,
            contaBancaria,
            sitPagamento,
            dataInicio,
            dataFinal,
            formArquivo, // PDF ou CSV
        } = req.body;

        const query = {
            ...(fornecedor && { nomeOrigem: fornecedor }),
            ...(tipoLancamento && { tipoLancamento }),
            ...(tipoDocumento && { tipoDocumento }),
            ...(contaBancaria && { nomeDestino: contaBancaria }),
            ...(sitPagamento && { sitPagamento }),
            ...(dataInicio && {
                datadeVencimento: { $gte: new Date(dataInicio) },
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

        // Verificar qual formato de arquivo foi solicitado
        if (formArquivo === "PDF") {
            const filePath = path.join(
                __dirname,
                `../../PDF`,
                `financial_report.pdf`
            );
            ensureDirectoryExistence(filePath);
            await generateFinancialReportPDF(financialMovements, filePath);

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
                "Content-Disposition",
                `attachment; filename=financial_report.pdf`
            );
            res.sendFile(filePath, (err) => {
                if (err) {
                    console.error("Erro ao enviar o arquivo:", err);
                    res.status(500).send("Erro ao enviar o arquivo.");
                }
                fs.unlinkSync(filePath); // Remover arquivo após envio
            });
        } else if (formArquivo === "CSV") {
            const filePath = path.join(
                __dirname,
                `../../CSV`,
                `financial_report.csv`
            );
            ensureDirectoryExistence(filePath);
            await generateFinancialReportCSV(financialMovements, filePath);

            res.setHeader("Content-Type", "text/csv");
            res.setHeader(
                "Content-Disposition",
                `attachment; filename=financial_report.csv`
            );
            res.sendFile(filePath, (err) => {
                if (err) {
                    console.error("Erro ao enviar o arquivo:", err);
                    res.status(500).send("Erro ao enviar o arquivo.");
                }
                fs.unlinkSync(filePath); // Remover arquivo após envio
            });
        } else {
            res.status(400).send("Formato de arquivo inválido.");
        }
    } catch (error) {
        console.error("Erro ao gerar o relatório financeiro:", error);
        res.status(500).send("Erro ao gerar o relatório financeiro.");
    }
};

module.exports = { generateFinancialReport };
