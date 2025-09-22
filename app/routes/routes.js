const express = require('express');
const router = express.Router();

// CONTROLLERS
const indexController = require('../controllers/indexController');
const vertudoController = require('../controllers/vertudoController');
const perfumesController = require('../controllers/perfumesController');

// ROUTER
router.get('/', indexController.renderIndex);
router.get('/vertudo', vertudoController.renderVertudo);
router.get('/perfumes', perfumesController.renderPerfumes);

module.exports = router;
