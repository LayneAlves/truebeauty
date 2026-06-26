const ProdutoModel = require('../models/produtoModel');
const { processImage } = require('../middleware/imageUpload');
const BannerModel = require('../models/bannerModel');


const ProdutoController = {
    async cadastrar(req, res) {
        try {
            const { nome, preco, descricao, estoque, subcategoria, categoria } = req.body;
            let imagem = await processImage(req.file, "produtos");
            imagem = "/assets/imagem/produtos/" + imagem;

            // ← id removido, banco gera automaticamente
            const newProduto = {
                nome,
                preco,
                descricao,
                imagem,
                estoque,
                subcategoria,
                categoria
            };

            await ProdutoModel.cadastrar(newProduto);

            res.render('produtos', {
                produtos: await ProdutoModel.produtos()
            });

        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            return res.json({ message: 'Erro ao cadastrar produto' });
        }
    },

    async produtos(req, res, next) {
        try {
            const produtos = await ProdutoModel.produtos();
            res.locals.produtos = produtos;
            next();
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
            const banners = await BannerModel.listar(); // ← busca todos
            const bannersAtivos = banners.filter(b => b.status == 1); // ← filtra ativos


            for (let produto of produtos) {
                if (!produto.categoria) continue; // ← volta para 'categoria' minúsculo

                if (!categoriasJaVistas[produto.categoria]) {
                    categoriasJaVistas[produto.categoria] = true;
                    produtosPorCategoria.push(produto);
                }

                if (produtosPorCategoria.length === 6) break;
            }

            // Separa os banners ativos pelo destino correto
            const bannersHero = bannersAtivos.filter(b => b.destino === 'hero');
            const bannersRotativo = bannersAtivos.filter(b => b.destino === 'rotativo');

            // Agora passa as variáveis exatas que o seu index.ejs está esperando
            res.render('index', {
                produtos: produtosPorCategoria,
                banners: bannersHero,
                bannersRotativo: bannersRotativo
            });

        } catch (error) {
            console.error('Erro ao obter produtos:', error);
            return res.json({ message: 'Erro ao obter produtos' });
        }
    },

    async excluirProduto(req, res) {
        try {
            const id = parseInt(req.params.id);
            await ProdutoModel.excluir(id);
            res.redirect('/produtos');
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            return res.status(500).json({ message: 'Erro ao excluir produto' });
        }
    },


    async editarProduto(req, res) {
        try {
            const id = parseInt(req.params.id);
            const { nome, preco, descricao, estoque, subcategoria, categoria } = req.body;

            const produtos = await ProdutoModel.produtos();
            // ← nome da coluna atualizado para o banco
            const produtoOriginal = produtos.find(p => p.id === id);

            if (!produtoOriginal) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            // ← nome da coluna atualizado para o banco
            let imagem = produtoOriginal.imagem;
            if (req.file) {
                const novaImagem = await processImage(req.file, "produtos");
                imagem = "/assets/imagem/produtos/" + novaImagem;
            }

            const produtoAtualizado = {
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
    },
    // Descrição do produto 
    async exibirDetalhes(req, res) {
        try {
            const id = parseInt(req.params.id);
            const produto = await ProdutoModel.buscarPorId(id);

            if (!produto) {
                return res.status(404).send('Produto não encontrado');
            }

            res.render('descricaoProduto', { produto });
        } catch (error) {
            console.error('Erro ao exibir detalhes do produto:', error);
            return res.status(500).json({ message: 'Erro ao obter detalhes do produto' });
        }
    }

}

module.exports = ProdutoController;

