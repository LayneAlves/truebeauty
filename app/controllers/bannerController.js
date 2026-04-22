const BannerModel = require('../models/bannerModel'); // Certifique-se de criar este Model
const { processImage } = require('../middleware/imageUpload');

const bannerController = {

    async listar(req, res) {
        try {
            const banners = await BannerModel.listar();
            res.render('banners', { banners }); // Renderiza sua view de banners
        } catch (error) {
            console.error('Erro ao obter banners:', error);
            return res.status(500).send('Erro ao carregar banners');
        }
    },
    async cadastrarbanner(req, res, next) {
        try {
            // Recebe o nome/título do banner do formulário
            const { titulo } = req.body;
            let imagem = await processImage(req.file, "banners");
            imagem = "/assets/imagem/banners/" + imagem;

            // Cria o objeto do banner com ID incremental
            const bannersAtuais = await BannerModel.listar();
            const newBanner = {
                id: bannersAtuais.reduce((maxId, b) => Math.max(maxId, b.id), 0) + 1,
                titulo,
                imagem,
                status : true
            };
            await BannerModel.cadastrarbanner(newBanner);

            //Redireciona para a página de listagem ou painel
            // res.redirect('/banners');
                next();
        } catch (error) {
            console.error('Erro ao cadastrar banner:', error);
            return res.status(500).json({ message: 'Erro ao cadastrar banner' });
        }
    },


};

module.exports = bannerController;
