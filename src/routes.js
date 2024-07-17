const express = require('express');
const routes = express.Router();
const NewController = require('./Controllers/newController');

// Private
// routes.get('/finance', tokenValidation, ???.getUsers);
// routes.get('/finance/:id', tokenValidation,  ???.getUserById);

// Public
routes.post('/finance/create', NewController.createNew);
routes.get('/finance', NewController.getNews);

module.exports = routes;