const express = require('express');
const router = express.Router();

// CONTROLLERS
const indexController = require('../controllers/indexController');
const produtosController = require('../controllers/produtosController');
const categoriasController = require('../controllers/categoriasController');

// ROUTER
router.get('/', indexController.renderIndex);
router.get('/produtos', produtosController.renderProdutos);
router.get('/categorias', categoriasController.renderCategorias);

module.exports = router;
