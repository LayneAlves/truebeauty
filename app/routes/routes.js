const express = require('express');
const router = express.Router();

// CONTROLLERS
const indexController = require('../controllers/indexController');
const vertudoController = require('../controllers/vertudoController');
const perfumesController = require('../controllers/perfumesController');
const cabelosController = require('../controllers/cabelosController');
const cuidados_pessoaisController = require('../controllers/cuidados_pessoaisController');
const perfumes_femininoController = require('../controllers/perfumes_femininoController');
const maquiagemController = require('../controllers/maquiagemController');
const skin_careController = require('../controllers/skin_careController');

// ROUTER
router.get('/', indexController.renderIndex);
router.get('/vertudo', vertudoController.renderVertudo);
router.get('/perfumes', perfumesController.renderPerfumes);
router.get('/cabelos', cabelosController.renderCabelos);
router.get('/cuidados_pessoais', cuidados_pessoaisController.renderCuidados_pessoais);
router.get('/perfumes_feminino', perfumes_femininoController.renderPerfumes_feminino);
router.get('/maquiagem', maquiagemController.renderMaquiagem);
router.get('/skin_care', skin_careController.renderSkin_care);

module.exports = router;
