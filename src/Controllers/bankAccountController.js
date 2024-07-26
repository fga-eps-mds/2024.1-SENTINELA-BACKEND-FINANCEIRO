const BankAccount = require('../Models/bankAccountSchema'); // Importação do modelo

const createBankAccount = async (req, res) => {
    try {
        // Log dos dados recebidos para depuração
        console.log('Dados recebidos:', req.body);

        // Validação simples dos dados
        const formData = req.body.formData;

        const bankAccount = new BankAccount(formData); // Criação de uma nova conta bancária
        await bankAccount.save(); // Salvando a conta bancária no banco de dados
        console.log('Conta bancária criada com sucesso:', bankAccount);
        res.status(201).send(bankAccount); // Enviando resposta de sucesso

    } catch (error) {
        // Log do erro para depuração
        console.error('Erro ao criar conta bancária:', error.message);
        res.status(400).send({ error: error.message }); // Enviando erro caso ocorra
    }
};

const getBankAccount = async (req, res) => {
    try {
        const bankAccounts = await BankAccount.find(); // Obtendo todas as contas bancárias
        res.status(200).send(bankAccounts);
    } catch (error) {
        // Log do erro para depuração
        console.error('Erro ao listar contas bancárias:', error.message);
        res.status(500).send({ error: error.message }); // Enviando mensagem de erro
    }
};

const deleteBankAccount = async (req, res) => {
    try {
        const bankAccount = await BankAccount.findByIdAndDelete(req.params.id); // Deletando conta pelo ID
        if (!bankAccount) {
            return res.status(404).send({ message: 'Conta não encontrada' }); // Enviando mensagem de erro se a conta não for encontrada
        }
        res.status(200).send({ message: 'Conta deletada com sucesso' });
    } catch (error) {
        // Log do erro para depuração
        console.error('Erro ao deletar conta bancária:', error.message);
        res.status(500).send({ error: error.message }); // Enviando mensagem de erro
    }
};

module.exports = {
    createBankAccount,
    getBankAccount,
    deleteBankAccount
};
