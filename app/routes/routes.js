const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const ProdutoController = require('../controllers/produtoController');
const PedidoController = require('../controllers/pedidoController');
const bannerController = require('../controllers/bannerController');
const { imageUpload } = require('../middleware/imageUpload');
const auth = require('../middleware/authMiddleware');

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

// Rota da página de administração — exige login e perfil admin
router.get('/for_adm', auth.verificarLogado, auth.somenteAdmin, for_admController.renderfor_adm);

router.get('/', auth.verificarLogado, (req, res) => {
    res.render('index', { user: req.user });
});

// Rotas do carrinho
router.get('/carrinho', (req, res) => {
    res.render('carrinho', { baseUrl: '' });
});

// Rotas do checkout
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

// Página de descrição do produto
router.get('/produto/:id', ProdutoController.exibirDetalhes);

// Rotas de pedidos
router.get('/pedidos', PedidoController.listarPedidos);

// Rotas de clientes
router.get('/clientes', UserController.users);

// Rotas de editar produto
router.post('/produtos/novo', imageUpload.single('imagem'), ProdutoController.cadastrar);

// rota de excluir produto
router.post('/produtos/excluir/:id', ProdutoController.excluirProduto);

// rota de excluir banner 
router.post('/banners/excluir/:id', bannerController.excluir);

// rota de excluir pedido
router.post('/pedidos/excluir/:id', PedidoController.excluirPedido);

// rota de excluir cliente
router.post('/clientes/excluir/:id', UserController.excluirCliente);

//Rotas de salvar produto editado
router.post('/produtos/editar/:id', imageUpload.single('imagem'), ProdutoController.editarProduto);

//Rotas Cadastrar banner
router.get('/banners', bannerController.listar);

router.post('/banners/novo',
    imageUpload.fields([
        { name: 'imagemDesktop', maxCount: 1 },
        { name: 'imagemTablet', maxCount: 1 },
        { name: 'imagemMobile', maxCount: 1 }
    ]),
    bannerController.cadastrarbanner,
    bannerController.listar
);

//Rotas editar banner
router.post('/banners/editar/:id',
    imageUpload.fields([
        { name: 'imagemDesktop', maxCount: 1 },
        { name: 'imagemTablet', maxCount: 1 },
        { name: 'imagemMobile', maxCount: 1 }
    ]),
    bannerController.editar,
    bannerController.listar
);

router.post('/banners/status/:id', bannerController.toggleStatus);

// Rotas de minha conta
router.get('/conta', auth.verificarLogado, UserController.renderConta);
router.post('/conta/atualizar', UserController.atualizarConta);

// Rotas endereco
router.get('/endereco', auth.verificarLogado, UserController.renderEndereco);
router.post('/conta/endereco', auth.verificarLogado, UserController.atualizarEndereco);

// Rotas de login
router.post('/login', UserController.login);

// Rotas do navbar 
router.get('/perfil', (req, res) => {
    res.render('perfil');
});

router.get('/busca', (req, res) => {
    res.render('busca');
});

module.exports = router;