const ProdutoModel = require('../models/produtoModel');
const BannerModel = require('../models/bannerModel');

const IndexController = {
    async home(req, res) {
        try {
            const produtos = await ProdutoModel.produtos();

            // Hero: pega banner(s) ativo(s) do tipo 'hero' — index.ejs usa banners[0]
            const banners = await BannerModel.listarAtivosPorDestino('hero');

            // Rotativo: todos os banners ativos do tipo 'rotativo', para o carrossel
            const bannersRotativo = await BannerModel.listarAtivosPorDestino('rotativo');

            res.render('index', {
                user: req.user,
                produtos,
                banners,
                bannersRotativo
            });
        } catch (error) {
            console.error('Erro ao renderizar a home:', error);
            return res.status(500).send('Erro ao carregar a página inicial');
        }
    }
};

module.exports = IndexController;