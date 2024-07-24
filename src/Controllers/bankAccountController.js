const BankAccount = require('../Models/bankAccountSchema'); // Importação do modelo

const createBankAccount = async (req, res) => {
    try {
        const bankAccount = new BankAccount(req.body); // Criação de nova instância do modelo com os dados da requisição
        await bankAccount.save(); // Salvando no banco de dados
        res.status(201).send(bankAccount); // Correção para enviar a conta criada
    } catch (error) {
        res.status(400).send(error); // Enviando erro caso ocorra
    }
};

const getBankAccount = async (req, res) => {
    try {
        const bankAccount = await BankAccount.find();
        res.status(200).send(bankAccount);
    } catch (error) {
        res.status(500).send({ error: error.message }); // Certifique-se de que `res` está sendo manipulado corretamente aqui
    }
};

const deleteBankAccount = async(req,res) =>{
    try{
        const bankAccount = await BankAccount.findByIdAndDelete(req.params.id);
        if(!bankAccount){
            res.status(404).send('Conta não encontrada');
        }
        res.status(200).send('Conta deletada com sucesso');
    }
    catch(error){
        res.status(500).send({error:error.message});
    }
};

module.exports = {
    createBankAccount,
    getBankAccount,
    deleteBankAccount
};
