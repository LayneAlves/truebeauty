const ProdutoModel = require('../models/produtoModel');
const { processImage } = require('../middleware/imageUpload');


const ProdutoController = {
    async cadastrar(req, res) {
        try {

            const produtos = await ProdutoModel.produtos();
            //Recebe os dados do formulario
            const { nome, preco, descricao, estoque, subcategoria, categoria } = req.body;
            let imagem = await processImage(req.file, "produtos");
            imagem = "/assets/imagem/produtos/" + imagem;

            //Cria um novo produto
            const newProduto = {
                id: ProdutoModel.produtos().reduce((maxId, produto) => Math.max(maxId, produto.id), 0) + 1,
                nome,
                preco,
                descricao,
                imagem,
                estoque,
                subcategoria,
                categoria
            }

            console.log('Novo produto:', newProduto);

            //await, espere até ele funcionar  
            await ProdutoModel.cadastrar(newProduto);
            res.render('produtos', {
                produtos: await ProdutoModel.produtos()
            }); // Redireciona para a página de produtos após o cadastro

            //Retorno ao usuário
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            return res.json({ message: 'Erro ao cadastrar produto' });
        }

    },
    async produtos(req, res, next) {
        try {
            const produtos = await ProdutoModel.produtos();
            res.locals.produtos = await produtos;
            next();
            // res.render('produtos', { produtos });

        } catch (error) {
            console.error('Erro ao obter produtos:', error);
            return res.json({ message: 'Erro ao obter produtos' });
        }
    },

    async buscar(req, res, next) {
        const subcategoria = req.query.subcategoria || '';
        const categoria = req.query.categoria || '';

        try {
            let produtos;

            if (subcategoria) {
                produtos = await ProdutoModel.buscar(subcategoria, 'subcategoria');
            } else if (categoria) {
                produtos = await ProdutoModel.buscar(categoria, 'categoria');
            } else {
                produtos = await ProdutoModel.buscar('', '');
            }

            res.locals.produtos = produtos;
            next();

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
    },

    async editarProduto(req, res) {
        try {
            const id = parseInt(req.params.id);
            const { nome, preco, descricao, estoque, subcategoria, categoria } = req.body;


            const produtos = await ProdutoModel.produtos();
            const produtoOriginal = produtos.find(p => p.id === id);

            if (!produtoOriginal) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }


            let imagem = produtoOriginal.imagem;
            if (req.file) {
                const novaImagem = await processImage(req.file, "produtos");
                imagem = "/assets/imagem/produtos/" + novaImagem;
            }

            const produtoAtualizado = {
                id,
                nome,
                preco,
                descricao,
                imagem,
                estoque,
                subcategoria,
                categoria
            };

            await ProdutoModel.atualizar(id, produtoAtualizado);

            res.redirect('/produtos');

        } catch (error) {
            console.error('Erro ao editar produto:', error);
            return res.status(500).json({ message: 'Erro ao editar produto' });
        }
    }
}

module.exports = ProdutoController;

