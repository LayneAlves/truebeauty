const express = require('express');
const router = express.Router();

// CONTROLLERS
const indexController = require('../controllers/indexController');
const produtosController = require('../controllers/produtosController');

// ROUTER
router.get('/', indexController.renderIndex);
router.get('/produtos', produtosController.renderProdutos);

module.exports = router;
