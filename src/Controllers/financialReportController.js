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

// Função simples de sanitização
const sanitizeInput = (input) => {
    if (typeof input === "string") {
        return input.replace(/[^\w\s\-.,@]/g, ""); // Remover caracteres perigosos, mantendo letras, números, espaços, etc.
    }
    return input;
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

        // Sanitizar entradas
        const sanitizedNomeOrigem = sanitizeInput(nomeOrigem);
        const sanitizedContaOrigem = sanitizeInput(contaOrigem);
        const sanitizedContaDestino = sanitizeInput(contaDestino);
        const sanitizedNomeDestino = sanitizeInput(nomeDestino);
        const sanitizedTipoDocumento = sanitizeInput(tipoDocumento);
        const sanitizedSitPagamento = sanitizeInput(sitPagamento);

        // Construir a consulta incluindo contaOrigem e contaDestino
        const query = {};

        // Adiciona os outros parâmetros da consulta se estiverem presentes
        if (sanitizedNomeOrigem) query.nomeOrigem = sanitizedNomeOrigem;
        if (sanitizedContaOrigem) query.contaOrigem = sanitizedContaOrigem;
        if (sanitizedContaDestino) query.contaDestino = sanitizedContaDestino;
        if (sanitizedTipoDocumento)
            query.tipoDocumento = sanitizedTipoDocumento;
        if (sanitizedNomeDestino) query.nomeDestino = sanitizedNomeDestino;
        if (sanitizedSitPagamento) query.sitPagamento = sanitizedSitPagamento;

        // Trata as datas de pagamento corretamente
        if (dataInicio && !dataFinal) {
            query.datadePagamento = { $gte: new Date(dataInicio) };
        } else if (!dataInicio && dataFinal) {
            query.datadePagamento = { $lte: new Date(dataFinal) };
        } else if (dataInicio && dataFinal) {
            query.datadePagamento = {
                $gte: new Date(dataInicio),
                $lte: new Date(dataFinal),
            };
        }

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
