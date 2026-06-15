const db = require('../config/db');
// const fs = require('fs');
// const path = require('path');

// const filePath = path.join(__dirname, '../data/produtos.json');
// const pedidosPath = path.join(__dirname, '../data/pedidos.json');

const ProdutoModel = {

    // produtos() {
    //     const data = fs.readFileSync(filePath, 'utf8');
    //     const produtos = JSON.parse(data);
    //     return produtos;
    //     return JSON.parse(data);
    // },

    async produtos() {
        const [rows] = await db.query(`
            SELECT
                COD_PRODUTO      AS id,
                NOME_PRODUTO     AS nome,
                PRECO            AS preco,
                DESCRICAO        AS descricao,
                IMAGEM           AS imagem,
                ESTOQUE          AS estoque,
                COD_SUBCATEGORIA AS subcategoria,
                COD_CATEGORIA    AS categoria
            FROM PRODUTO
        `);
        return rows;
    },
    // buscar(valor, campo) {
    //     const data = fs.readFileSync(filePath, 'utf8');
    //     const produtos = JSON.parse(data);

    //     if (campo === 'subcategoria') {
    //         return produtos.filter(produto => produto.subcategoria === valor);
    //     }


    //     if (campo === 'categoria') {
    //         return produtos.filter(produto => produto.categoria === valor);
    //     }
    //     // sem filtro: retorna tudo
    //     return produtos;
    // },

    async buscar(valor, campo) {
        const select = `
        SELECT
            p.COD_PRODUTO      AS id,
            p.NOME_PRODUTO     AS nome,
            p.PRECO            AS preco,
            p.DESCRICAO        AS descricao,
            p.IMAGEM           AS imagem,
            p.ESTOQUE          AS estoque,
            p.COD_SUBCATEGORIA AS subcategoria,
            p.COD_CATEGORIA    AS categoria
        FROM PRODUTO p
    `;

        if (campo === 'subcategoria') {
            const [rows] = await db.query(
                select + `JOIN SUBCATEGORIAS s ON p.COD_SUBCATEGORIA = s.COD_SUBCATEGORIA
                      WHERE s.NOME_CATEGORIA = ?`, [valor]
            );
            return rows;
        }
        if (campo === 'categoria') {
            const [rows] = await db.query(
                select + `JOIN CATEGORIAS c ON p.COD_CATEGORIA = c.COD_CATEGORIA
                      WHERE c.NOME_CATEGORIA = ?`, [valor]
            );
            return rows;
        }
        const [rows] = await db.query(select);
        return rows;
    },

    // cadastrar(newProduto) {
    //     const produtos = this.produtos();
    //     produtos.push(newProduto);

    //     fs.writeFileSync(filePath, JSON.stringify(produtos, null, 2), 'utf8');
    // },

    async cadastrar(newProduto) {
        const { nome, preco, descricao, imagem, estoque, subcategoria, categoria } = newProduto;

        // Busca o ID da categoria pelo nome
        const [[cat]] = await db.query(
            'SELECT COD_CATEGORIA FROM CATEGORIAS WHERE NOME_CATEGORIA = ?', [categoria]
        );

        // Busca o ID da subcategoria pelo nome
        const [[sub]] = await db.query(
            'SELECT COD_SUBCATEGORIA FROM SUBCATEGORIAS WHERE NOME_CATEGORIA = ?', [subcategoria]
        );

        const [result] = await db.query(
            `INSERT INTO PRODUTO (NOME_PRODUTO, PRECO, DESCRICAO, IMAGEM, ESTOQUE, COD_SUBCATEGORIA, COD_CATEGORIA)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [nome, preco, descricao, imagem, estoque, sub?.COD_SUBCATEGORIA || null, cat?.COD_CATEGORIA || null]
        );
        return result.insertId;
    },

    // salvar(produtos) {
    //     fs.writeFileSync(filePath, JSON.stringify(produtos, null, 2), 'utf8');
    // },
    // async atualizar(id, dadosAtualizados) {
    // 1. Pega a lista completa de produtos do arquivo JSON
    // const produtos = this.produtos();

    // 2. Encontra a posição (índice) do produto que tem o ID que queremos editar
    // const index = produtos.findIndex(p => p.id === id);

    // 3. Se o produto existir (índice diferente de -1)
    // if (index !== -1) {
    // Substitui o produto antigo pelo novo pacote de dados
    // produtos[index] = dadosAtualizados;

    // 4. Grava a lista atualizada de volta no arquivo produtos.json
    //     this.salvar(produtos);
    //     return produtos[index];
    // } else {
    //     throw new Error('Produto não encontrado para atualização.');
    // }
    // },

    async atualizar(id, dadosAtualizados) {
        const { nome, preco, descricao, imagem, estoque, subcategoria, categoria } = dadosAtualizados;

        const [[cat]] = await db.query(
            'SELECT COD_CATEGORIA FROM CATEGORIAS WHERE NOME_CATEGORIA = ?', [categoria]
        );
        const [[sub]] = await db.query(
            'SELECT COD_SUBCATEGORIA FROM SUBCATEGORIAS WHERE NOME_CATEGORIA = ?', [subcategoria]
        );

        await db.query(
            `UPDATE PRODUTO SET NOME_PRODUTO=?, PRECO=?, DESCRICAO=?, IMAGEM=?, ESTOQUE=?,
         COD_SUBCATEGORIA=?, COD_CATEGORIA=? WHERE COD_PRODUTO=?`,
            [nome, preco, descricao, imagem, estoque, sub?.COD_SUBCATEGORIA || null, cat?.COD_CATEGORIA || null, id]
        );
    },
    // async excluir(id) {
    //     const produtos = this.produtos(); // pega os produtos atuais
    //     const novosProdutos = produtos.filter(p => p.id !== id);
    //     this.salvar(novosProdutos); // salva de volta
    // },

    async excluir(id) {
        await db.query('DELETE FROM PRODUTO WHERE COD_PRODUTO = ?', [id]);
    },

    async decrementarEstoque(itensCarrinho) {
        for (const item of itensCarrinho) {
            await db.query(
                `UPDATE PRODUTO SET ESTOQUE = ESTOQUE - ?
                 WHERE COD_PRODUTO = ? AND ESTOQUE >= ?`,
                [item.quantidade, item.id, item.quantidade]
            );
        }
    },

    salvar() { }



}

module.exports = ProdutoModel;