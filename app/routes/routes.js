const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const ProdutoController = require('../controllers/produtoController');
const { imageUpload } = require('../middleware/imageUpload');


// CONTROLLERS
const indexController = require('../controllers/indexController');
const vertudoController = require('../controllers/vertudoController');
// const perfumesController = require('../controllers/perfumesController');
// const cabelosController = require('../controllers/cabelosController');
// const cuidados_pessoaisController = require('../controllers/cuidados_pessoaisController');
// const perfumes_femininoController = require('../controllers/perfumes_femininoController');
// const maquiagemController = require('../controllers/maquiagemController');
// const skin_careController = require('../controllers/skin_careController');
// const hidratacaoController = require('../controllers/hidratacaoController');
// const nutricaoController = require('../controllers/nutricaoController');
// const reconstrucaoController = require('../controllers/reconstrucaoController');
// const perfumes_masculinoController = require('../controllers/perfumes_masculinoController');
// const perfumes_infantilController = require('../controllers/perfumes_infantilController');
// const body_splashController = require('../controllers/body_splashController');
// const rostoController = require('../controllers/rostoController');
// const olhosController = require('../controllers/olhosControllers');
// const labiosController = require('../controllers/labiosController');
// const depilacaoController = require('../controllers/depilacaoController');
// const higieneIntimaController = require('../controllers/higieneIntimaController');
// const protetorSolarController = require('../controllers/protetorSolarController');
// const kitBarbaController = require('../controllers/kitBarbaController');
// const primerController = require('../controllers/primerController');
// const corretivoController = require('../controllers/corretivoController');
// const poController = require('../controllers/poController');
// const batomController = require('../controllers/batomController');


// ROUTER
router.get('/', ProdutoController.index);

router.get('/vertudo', ProdutoController.produtos, (req, res) => {
    res.render('vertudo');
});

router.get('/categoria', ProdutoController.buscar, (req, res) => {
    res.render('categoria');
});


const for_admController = require('../controllers/for_edmController');

router.get('/for_adm', for_admController.renderfor_adm);


// Rotas do carrinho
router.get('/carrinho', (req, res) => {
    res.render('carrinho', { baseUrl: '' });
});

router.get('/checkout', (req, res) => {
    res.render('checkout', { baseUrl: '' });
});

// Rotas de cadastro
router.get('/cadastro', UserController.renderCadastro);
router.post('/cadastro', UserController.cadastrar);

// Rotas de cadastro de produto
router.get('/cadastroProduto', (req, res) => {
    res.render('cadastroProduto');
});

// Rotas de produtos
router.get('/produtos', ProdutoController.produtos, (req, res, next) => {
    res.render('produtos');
});

// Rotas de editar produto
router.post('/produtos/novo', imageUpload.single('imagem'), ProdutoController.cadastrar);

// rota de excluir produto
router.post('/produtos/excluir/:id', ProdutoController.excluirProduto);

//Rotas de salvar produto editado
router.post('/produtos/editar/:id', imageUpload.single('imagem'), ProdutoController.editarProduto);


// Rotas de login
router.post('/login', UserController.login);

module.exports = router;
