const BannerModel = require('../models/bannerModel'); // Certifique-se de criar este Model
const { processImage } = require('../middleware/imageUpload');

const bannerController = {

    async listar(req, res) {
        try {
            const banners = await BannerModel.listar();
            res.render('banners', { banners });
        } catch (error) {
            console.error('Erro ao obter banners:', error);
            return res.status(500).send('Erro ao carregar banners');
        }
    },


    async cadastrarbanner(req, res, next) {
        try {
            const { titulo } = req.body;
            let imagem = await processImage(req.file, "banners");
            imagem = "/assets/imagem/banners/" + imagem;

            // ← id removido, banco gera automaticamente
            const newBanner = { titulo, imagem };
            await BannerModel.cadastrarbanner(newBanner);
            next();
        } catch (error) {
            console.error('Erro ao cadastrar banner:', error);
            return res.status(500).json({ message: 'Erro ao cadastrar banner' });
        }
    },
    async excluir(req, res) {
        try {
            const { id } = req.params;
            await BannerModel.excluir(id);
            res.redirect('/banners');
        } catch (error) {
            console.error('Erro ao excluir banner:', error);
            res.status(500).json({ message: 'Erro ao excluir banner' });
        }
    },

    async toggleStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            await BannerModel.toggleStatus(id, status);
            res.json({ success: true });
        } catch (error) {
            console.error('Erro ao alterar status do banner:', error);
            res.status(500).json({ message: 'Erro ao alterar status' });
        }
    }

};

module.exports = bannerController;
