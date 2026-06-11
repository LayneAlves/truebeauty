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
        const [rows] = await db.query(`
        SELECT
            P.COD_PEDIDO        AS id,
            P.VALOR_TOTAL       AS total,
            P.STATUS_PEDIDO     AS status,
            P.DATA_HORA         AS data,
            P.ID_USUARIO        AS usuario_id,
            P.FORMA_PAGAMENTO   AS pagamento,
            COALESCE(U.NOME_USUARIO, 'Cliente não identificado') AS cliente_nome
        FROM PEDIDO P
        LEFT JOIN USUARIO U ON P.ID_USUARIO = U.ID_USUARIO
        ORDER BY P.DATA_HORA DESC
    `);
        return rows;
    },
    async cadastrar(novoPedido) {
        const { total, status, usuario_id, pagamento } = novoPedido;
        const [result] = await db.query(
            `INSERT INTO PEDIDO (VALOR_TOTAL, STATUS_PEDIDO, ID_USUARIO, FORMA_PAGAMENTO)
         VALUES (?, ?, ?, ?)`,
            [total, status, usuario_id || null, pagamento || null]
        );
        return result.insertId;
    },

    async excluir(id) {
        await db.query('DELETE FROM PEDIDO WHERE COD_PEDIDO = ?', [id]);
    },


}