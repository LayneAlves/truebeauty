const express = require('express');
const router = express.Router();

// CONTROLLERS
const indexController = require('../controllers/indexController');
const vertudoController = require('../controllers/vertudoController');
const categoriasController = require('../controllers/categoriasController');

// ROUTER
router.get('/', indexController.renderIndex);
router.get('/vertudo', vertudoController.renderVertudo);
router.get('/categorias', categoriasController.renderCategorias);

module.exports = router;
