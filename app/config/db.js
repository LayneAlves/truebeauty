// models/pedidoModel.js
// const db = require('../config/db');

module.exports = {
    async listarPedidos() {
        const [rows] = await db.query('SELECT * FROM PEDIDO ORDER BY DATA_HORA DESC');
        return rows;
    },

    async cadastrar(novoPedido) {
        const { cliente_nome, total, status, usuario_id } = novoPedido;
        const [result] = await db.query(
            `INSERT INTO PEDIDO (VALOR_TOTAL, STATUS_PEDIDO, DATA_HORA, ID_USUARIO)
             VALUES (?, ?, NOW(), ?)`,
            [total, status, usuario_id || null]
        );
        return result.insertId;
    },

    async salvar(pedidos) {
        // Não é necessário com MySQL — cada operação é feita diretamente
    }
};