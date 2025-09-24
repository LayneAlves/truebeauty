const express = require('express');
const router = express.Router();

// CONTROLLERS
const indexController = require('../controllers/indexController');
const vertudoController = require('../controllers/vertudoController');
const perfumesController = require('../controllers/perfumesController');
const cabelosController = require('../controllers/cabelosController');

// ROUTER
router.get('/', indexController.renderIndex);
router.get('/vertudo', vertudoController.renderVertudo);
router.get('/perfumes', perfumesController.renderPerfumes);
router.get('/cabelos', cabelosController.renderCabelos);

module.exports = router;
