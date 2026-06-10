const db = require('../config/db');
// const fs = require('fs');
// const path = require('path');

// const pedidosPath = path.join(__dirname, '../data/pedidos.json');

module.exports = {
    // listarPedidos() {
    //     if (!fs.existsSync(pedidosPath)) {
    //         return [];
    //     }

    //     const dados = fs.readFileSync(pedidosPath, 'utf8');
    //     return JSON.parse(dados);
    // }

    async listarPedidos() {
        const [rows] = await db.query('SELECT * FROM PEDIDO ORDER BY DATA_HORA DESC');
        return rows;
    },
    async cadastrar(novoPedido) {
        const { total, status, usuario_id } = novoPedido;
        const [result] = await db.query(
            `INSERT INTO PEDIDO (VALOR_TOTAL, STATUS_PEDIDO, ID_USUARIO)
             VALUES (?, ?, ?)`,
            [total, status, usuario_id || null]
        );
        return result.insertId;
    },

    async excluir(id) {
        await db.query('DELETE FROM PEDIDO WHERE COD_PEDIDO = ?', [id]);
    },

    salvar() { }

}