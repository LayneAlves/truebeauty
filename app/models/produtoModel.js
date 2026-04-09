const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/produtos.json');

const ProdutoModel = {

    produtos() {
        const data = fs.readFileSync(filePath, 'utf8');
        const produtos = JSON.parse(data);
        return produtos;
    },
    buscar(categoria, campo) {
        const data = fs.readFileSync(filePath, 'utf8');
        const produtos = JSON.parse(data);

        if (campo == "categoria") {
            return produtos.filter(produto => produto.categoria === categoria);
        } 
    },

    cadastrar(newProduto) {
        const produtos = this.produtos();
        produtos.push(newProduto);
        fs.writeFileSync(filePath, JSON.stringify(produtos, null, 2), 'utf8');
    },

    salvar(produtos) {
        fs.writeFileSync(filePath, JSON.stringify(produtos, null, 2), 'utf8');
    },
    async atualizar(id, dadosAtualizados) {
        // 1. Pega a lista completa de produtos do arquivo JSON
        const produtos = this.produtos();

        // 2. Encontra a posição (índice) do produto que tem o ID que queremos editar
        const index = produtos.findIndex(p => p.id === id);

        // 3. Se o produto existir (índice diferente de -1)
        if (index !== -1) {
            // Substitui o produto antigo pelo novo pacote de dados
            produtos[index] = dadosAtualizados;

            // 4. Grava a lista atualizada de volta no arquivo produtos.json
            this.salvar(produtos);
            return produtos[index];
        } else {
            throw new Error('Produto não encontrado para atualização.');
        }
    },
    async excluir(id) {
        const produtos = this.produtos(); // pega os produtos atuais
        const novosProdutos = produtos.filter(p => p.id !== id);
        this.salvar(novosProdutos); // salva de volta
    }

}

module.exports = ProdutoModel;