const path = require("path");
const FinancialMovements = require("../Models/financialMovementsSchema");
const { generateFinancialReportPDF } = require("../Models/pdfGenerator");
const fs = require("fs");

const ensureDirectoryExistence = (filePath) => {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
};

const generatePDFReport = async (req, res) => {
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
        } = req.body;

        console.log("Parâmetros recebidos:");
        console.log("Fornecedor:", fornecedor);
        console.log("Tipo de Lançamento:", tipoLancamento);
        console.log("Tipo de Documento:", tipoDocumento);
        console.log("Conta Bancária:", contaBancaria);
        console.log("Situação de Pagamento:", sitPagamento);
        console.log("Data de Início:", dataInicio);
        console.log("Data Final:", dataFinal);

        // Mapear 'contaBancaria' para 'nomeDestino'
        const query = {
            ...(fornecedor && { nomeOrigem: fornecedor }),
            ...(tipoLancamento && { tipoLancamento }),
            ...(tipoDocumento && { tipoDocumento }),
            ...(contaBancaria && { nomeDestino: contaBancaria }), // Substituído aqui
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
        console.log(
            "Detalhes das movimentações financeiras:",
            financialMovements
        );

        const filePath = path.join(
            __dirname,
            `../../PDF`,
            `financial_report.pdf`
        );
        ensureDirectoryExistence(filePath);
        console.log("Caminho para salvar o PDF gerado:", filePath);

        await generateFinancialReportPDF(financialMovements, filePath);
        console.log("PDF gerado com sucesso!");

        if (fs.existsSync(filePath)) {
            console.log(
                "PDF foi gerado e está disponível no caminho:",
                filePath
            );
        } else {
            console.error("O PDF não foi gerado corretamente.");
        }

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=report.pdf`);

        console.log("Enviando o arquivo PDF gerado...");
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error("Erro ao enviar o arquivo:", err);
                res.status(500).send("Erro ao enviar o arquivo.");
            } else {
                console.log("Arquivo PDF enviado com sucesso!");
            }

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log("Arquivo PDF removido.");
            } else {
                console.error("O arquivo PDF não existe para ser removido.");
            }
        });
    } catch (error) {
        console.error("Erro ao gerar o relatório financeiro:", error);
        res.status(500).send("Erro ao gerar o relatório financeiro.");
    }
};

module.exports = { generatePDFReport };
