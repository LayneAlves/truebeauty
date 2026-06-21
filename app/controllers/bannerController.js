const BannerModel = require('../models/bannerModel'); 
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
            const { titulo, categoria, alt, link, data_inicio, data_fim } = req.body;

            const fileDesktop = req.files?.imagemDesktop?.[0];
            const fileTablet  = req.files?.imagemTablet?.[0];
            const fileMobile  = req.files?.imagemMobile?.[0];

            if (!fileDesktop) {
                return res.status(400).json({ message: 'Imagem desktop é obrigatória' });
            }

            let imagem = await processImage(fileDesktop, "banners");
            imagem = "/assets/imagem/banners/" + imagem;

            let imagem_tablet = null;
            if (fileTablet) {
                imagem_tablet = await processImage(fileTablet, "banners");
                imagem_tablet = "/assets/imagem/banners/" + imagem_tablet;
            }

            let imagem_mobile = null;
            if (fileMobile) {
                imagem_mobile = await processImage(fileMobile, "banners");
                imagem_mobile = "/assets/imagem/banners/" + imagem_mobile;
            }

            const newBanner = { 
                titulo, imagem, imagem_tablet, imagem_mobile,
                categoria, alt, link, data_inicio, data_fim 
            };

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