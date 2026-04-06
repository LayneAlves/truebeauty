const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/produtos.json');

const ProdutoModel = {

    produtos() {
        const data = fs.readFileSync(filePath, 'utf8');
        const produtos = JSON.parse(data);
        return produtos;
    },

    cadastrar(newProduto) {
        const produtos = this.produtos();
        produtos.push(newProduto);
        fs.writeFileSync(filePath, JSON.stringify(produtos, null, 2), 'utf8');
    },

    salvar(produtos) {
        fs.writeFileSync(filePath, JSON.stringify(produtos, null, 2), 'utf8');
    },

    async excluir(id) {
        const produtos = this.produtos(); // pega os produtos atuais
        const novosProdutos = produtos.filter(p => p.id !== id);
        this.salvar(novosProdutos); // salva de volta
    }

}

module.exports = ProdutoModel;