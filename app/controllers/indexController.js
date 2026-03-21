const ProdutoModel = require('../models/produtoModel');

const ProdutoController = {
    async produtos (req, res){
        try {
            const produtos = await ProdutoModel.produtos();
            res.render('produtos', { produtos});
            // return res.json(produtos);
        } catch (error) {
            console.error('Erro ao obter produtos:', error);
            return res.json({ message: 'Erro ao obter produtos' });
        }
    }

}

module.exports = ProdutoController;

