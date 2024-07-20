const express = require('express');
const routes = express.Router();
const NewController = require('./Controllers/newController');
const supplierFormController = require('./Controllers/supplierFormController');

// Private
// routes.get('/finance', tokenValidation, ???.getUsers);
// routes.get('/finance/:id', tokenValidation,  ???.getUserById);
routes.post('/createSupplierForm', supplierFormController.createSupplierForm);
routes.get('/getSupplierForm', supplierFormController.getSupplierForm);

// Public
routes.post('/finance/create', NewController.createNew);
routes.get('/finance', NewController.getNews);

module.exports = routes;