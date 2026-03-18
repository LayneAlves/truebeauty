const ProdutoModel = require('../models/produtoModel');

const ProdutoController = {
    async cadastrar(req, res){
        try {
            //Recebe os dados do formulario
            const{ nome, preco, descricao } = req.body;
            const newProduto = {
                id: ProdutoModel.produtos().reduce((maxId, produto) => Math.max(maxId, produto.id), 0) + 1,
                nome,
                preco,
                descricao
            }
            //await, espere até ele funcionar  
            await ProdutoModel.cadastrar(newProduto);
            // return res.redirect ('/');
            return res.json({ message: 'Produto cadastrado com sucesso!' });

            //Retorno ao usuário
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            // res.status(500).send('Erro ao cadastrar produto');
            return res.json({ message: 'Erro ao cadastrar produto' });
        }
     
    },
    async produtos (req, res){
        try {
            const produtos = await ProdutoModel.produtos();
            res.render('index', { produtos});
            // return res.json(produtos);
        } catch (error) {
            console.error('Erro ao obter produtos:', error);
            return res.json({ message: 'Erro ao obter produtos' });
        }
    }

}

module.exports = ProdutoController;

