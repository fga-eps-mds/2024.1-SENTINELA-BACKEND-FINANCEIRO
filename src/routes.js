const express = require('express');
const routes = express.Router();
const newController = require('./Controllers/newController');
const bankAccountController = require('./Controllers/bankAccountController');


// Rotas Privadas (Comentadas por enquanto, você pode descomentar quando implementar a validação de token)
// router.get('/finance', tokenValidation, ???.getUsers);
// router.get('/finance/:id', tokenValidation, ???.getUserById);
routes.post('/finance/createBankAccount', bankAccountController.createBankAccount);
routes.get("/finance/bankAccount", bankAccountController.getBankAccount);
routes.get("/finance/bankAccount/:id", bankAccountController.getBankAccountbyId);
routes.delete('/finance/deleteBankAccount/:id', bankAccountController.deleteBankAccount);

// Rotas Públicas

routes.post('/finance/create', newController.createNew);
routes.get('/finance', newController.getNews);

module.exports = routes;
