const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const ProdutoController = require('../controllers/produtoController');
const PedidoController = require('../controllers/pedidoController');
const bannerController = require('../controllers/bannerController');
const { imageUpload } = require('../middleware/imageUpload');


// CONTROLLERS
const indexController = require('../controllers/indexController');
const vertudoController = require('../controllers/vertudoController');
const for_admController = require('../controllers/for_edmController');

// ROUTER
router.get('/', ProdutoController.index);

router.get('/vertudo', ProdutoController.produtos, (req, res) => {
    res.render('vertudo');
});

router.get('/categoria', ProdutoController.buscar, (req, res) => {
    res.render('categoria');
});

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

// Rotas de pedidos
router.get('/pedidos', PedidoController.listarPedidos);

// Rotas de clientes
router.get('/clientes', UserController.users);

// Rotas de editar produto
router.post('/produtos/novo', imageUpload.single('imagem'), ProdutoController.cadastrar);

// rota de excluir produto
router.post('/produtos/excluir/:id', ProdutoController.excluirProduto);

//Rotas de salvar produto editado
router.post('/produtos/editar/:id', imageUpload.single('imagem'), ProdutoController.editarProduto);

//Rotas Cadastrar banner
router.get('/banners', bannerController.listar);
router.post('/banners/novo', imageUpload.single('imagem'), bannerController.cadastrarbanner, bannerController.listar, (req, res) => {
    res.render('banners');
});


// Rotas de login
router.post('/login', UserController.login);

module.exports = router;

//Rotas do navbar 

// PERFIL
router.get('/perfil', (req, res) => {
  res.render('perfil');
});

// CARRINHO
router.get('/carrinho', (req, res) => {
  res.render('carrinho');
});

// BUSCA
router.get('/busca', (req, res) => {
  res.render('busca');
});
