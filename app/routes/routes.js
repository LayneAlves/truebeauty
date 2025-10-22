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
const hidratacaoController = require('../controllers/hidratacaoController');
const nutricaoController = require('../controllers/nutricaoController');
const reconstrucaoController = require('../controllers/reconstrucaoController');
const perfumes_masculinoController = require('../controllers/perfumes_masculinoController');
const perfumes_infantilController = require('../controllers/perfumes_infantilController');
const body_splashController = require('../controllers/body_splashController');
const rostoController = require('../controllers/rostoController');
const olhosController = require('../controllers/olhosControllers');
const labiosController = require('../controllers/labiosController');


// ROUTER
router.get('/', indexController.renderIndex);
router.get('/vertudo', vertudoController.renderVertudo);
router.get('/perfumes', perfumesController.renderPerfumes);
router.get('/cabelos', cabelosController.renderCabelos);
router.get('/cuidados_pessoais', cuidados_pessoaisController.renderCuidados_pessoais);
router.get('/perfumes_feminino', perfumes_femininoController.renderPerfumes_feminino);
router.get('/maquiagem', maquiagemController.renderMaquiagem);
router.get('/skin_care', skin_careController.renderSkin_care);
router.get('/hidratacao', hidratacaoController.renderHidratacao);
router.get('/nutricao', nutricaoController.renderNutricao);
router.get('/reconstrucao', reconstrucaoController.renderReconstrucao);
router.get('/perfumes_masculino', perfumes_masculinoController.renderPerfumes_masculino);
router.get('/perfumes_infantil', perfumes_infantilController.renderPerfumes_infantil);
router.get('/body_splash', body_splashController.renderBody_splash);
router.get('/rosto', rostoController.renderRosto);
router.get('/olhos', olhosController.renderOlhos);
router.get('/labios', labiosController.renderLabios);



module.exports = router;
