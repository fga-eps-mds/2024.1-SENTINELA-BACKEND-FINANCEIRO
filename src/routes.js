const express = require("express");
const routes = express.Router();
const newController = require("./Controllers/newController");
const bankAccountController = require("./Controllers/bankAccountController");
const supplierFormController = require("./Controllers/supplierFormController");

// Rotas Privadas (Comentadas por enquanto, você pode descomentar quando implementar a validação de token)
// router.get('/finance', tokenValidation, ???.getUsers);
// router.get('/finance/:id', tokenValidation, ???.getUserById);
// Rotas Contas Bancárias
routes.post(
    "/finance/createBankAccount",
    bankAccountController.createBankAccount
);
routes.get("/finance/bankAccount", bankAccountController.getBankAccount);
routes.get(
    "/finance/bankAccount/:id",
    bankAccountController.getBankAccountbyId
);
routes.delete(
    "/finance/deleteBankAccount/:id",
    bankAccountController.deleteBankAccount
);
routes.patch(
    "/finance/updateBankAccount/:id",
    bankAccountController.updateBankAccount
);
routes.get("/finance/getBankAccount", bankAccountController.getAll);

// Rotas Fornecedores
routes.post("/SupplierForm/create", supplierFormController.createSupplierForm);
routes.get("/SupplierForm", supplierFormController.getSupplierForm);
routes.get("/SupplierForm/:id", supplierFormController.getSupplierFormById);
routes.delete(
    "/SupplierForm/delete/:id",
    supplierFormController.deleteSupplierFormById
);
routes.patch(
    "/SupplierForm/update/:id",
    supplierFormController.updateSupplierFormById
);

// Rotas Públicas

routes.post("/finance/create", newController.createNew);
routes.get("/finance", newController.getNews);

module.exports = routes;
