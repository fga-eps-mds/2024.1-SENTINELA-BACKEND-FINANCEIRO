const express = require("express");
const routes = express.Router();
const bankAccountController = require("./Controllers/bankAccountController");
const supplierFormController = require("./Controllers/supplierFormController");
const financialMovementsController = require("./Controllers/financialMovementsController");
const financialReportController = require("./Controllers/financialReportController");

// Rotas Privadas (Comentadas por enquanto, você pode descomentar quando implementar a validação de token)
// router.get('/finance', tokenValidation, ???.getUsers);
// router.get('/finance/:id', tokenValidation, ???.getUserById);
// Rotas Contas Bancárias
routes.post(
    "/finance/createBankAccount",
    bankAccountController.createBankAccount
);
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
routes.post(
    "/financialMovements/create",
    financialMovementsController.createFinancialMovements
);
routes.get(
    "/financialMovements",
    financialMovementsController.getFinancialMovements
);
routes.get(
    "/financialMovements/:id",
    financialMovementsController.getFinancialMovementsById
);
routes.delete(
    "/financialMovements/delete/:id",
    financialMovementsController.deleteFinancialMovementsById
);
routes.patch(
    "/financialMovements/update/:id",
    financialMovementsController.updateFinancialMovementsById
);
routes.post(
    "/financialMovements/report",
    financialReportController.generateFinancialReport
);

module.exports = routes;
