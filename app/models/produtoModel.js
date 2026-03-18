const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/produtos.json');

const ProdutoModel = {
    salvar(dados){
    fs.writeFileSync(filePath, JSON.stringify(dados, null, 2), 'utf8');
    },
    
    produtos(){
        const data = fs.readFileSync(filePath, 'utf8');
        const produtos = JSON.parse(data);
        return produtos;
    },

    cadastrar(newProduto){
        const produtos = this.produtos();
       
        produtos.push(newProduto);
        fs.writeFileSync(filePath, JSON.stringify(produtos, null, 2), 'utf8');
    }
}

module.exports = ProdutoModel;
