const ProdutoModel = require('../models/produtoModel');
const { processarImagem } = require('../middleware/imagemUpload');


const ProdutoController = {
    async cadastrar(req, res) {
        try {
            //Recebe os dados do formulario
            const { nome, preco, descricao, estoque, categoria } = req.body;
            let imagem = null;
            if (req.file) {
                imagem = req.file.filename; // ou req.file.path dependendo do seu setup
            }

            //Cria um novo produto
            const newProduto = {
                id: ProdutoModel.produtos().reduce((maxId, produto) => Math.max(maxId, produto.id), 0) + 1,
                nome,
                preco,
                descricao,
                imagem,
                estoque,
                categoria
            }

            //await, espere até ele funcionar  
            await ProdutoModel.cadastrar(newProduto);
            return res.redirect('/produtos'); // Redireciona para a página de produtos após o cadastro

            //Retorno ao usuário
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            return res.json({ message: 'Erro ao cadastrar produto' });
        }

    },
    async produtos(req, res) {
        try {
            const produtos = await ProdutoModel.produtos();
            res.render('produtos', { produtos });
            // return res.json(produtos);
        } catch (error) {
            console.error('Erro ao obter produtos:', error);
            return res.json({ message: 'Erro ao obter produtos' });
        }
    },
    async index(req, res) {
        try {
            const produtos = await ProdutoModel.produtos();
            const categoriasJaVistas = {};
            const produtosPorCategoria = [];

            for (let produto of produtos) {
                if (!produto.categoria) continue;

                if (!categoriasJaVistas[produto.categoria]) {
                    categoriasJaVistas[produto.categoria] = true;
                    produtosPorCategoria.push(produto);
                }

                // trava em 6 categorias
                if (produtosPorCategoria.length === 6) break;
            }

            res.render('index', { produtos: produtosPorCategoria });

        } catch (error) {
            console.error('Erro ao obter produtos:', error);
            return res.json({ message: 'Erro ao obter produtos' });
        }
    },
    async excluirProduto(req, res) {
        const id = parseInt(req.params.id);
        await ProdutoModel.excluir(id);
        res.redirect('/produtos');
    }
}

module.exports = ProdutoController;

