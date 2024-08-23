const express = require('express');
const routes = express.Router();
const supplierFormController = require('./Controllers/supplierFormController');

// Private
// routes.get('/finance', tokenValidation, ???.getUsers);
// routes.get('/finance/:id', tokenValidation,  ???.getUserById);
routes.post('/SupplierForm/create', supplierFormController.createSupplierForm);
routes.get('/SupplierForm', supplierFormController.getSupplierForm);
routes.get('/SupplierForm/:id', supplierFormController.getSupplierFormById);
routes.delete('/SupplierForm/delete/:id', supplierFormController.deleteSupplierFormById);
routes.patch('/SupplierForm/update/:id', supplierFormController.updateSupplierFormById);

// Public

module.exports = routes;