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
        // Retorna apenas a conta bancária do nome fornecido
        if (req.query.name) {
            const bankAccount = await BankAccount.findOne({ name: req.query.name });
            
            if (bankAccount) {
                return res.status(200).json(bankAccount);
            } else {
                return res.status(404).json({ message: 'Conta não encontrada' });
            }
        } else {
            return res.status(400).json({ message: 'Nome não fornecido' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

const getBankAccountbyId = async (req, res) => {
    try {
        const bankAccount = await BankAccount.findById(req.params.id); // Buscando conta pelo ID
        if (!bankAccount) {
            return res.status(404).send({ message: 'Conta não encontrada' }); // Enviando mensagem de erro se a conta não for encontrada
        }
        res.status(200).json(bankAccount); // Enviando conta bancária encontrada
    } catch (error) {
        // Log do erro para depuração
        console.error('Erro ao buscar conta bancária:', error.message);
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
    deleteBankAccount,
    getBankAccountbyId
};
