// const db = require('../../config/db');
const fs = require('fs');
const path = require('path');

const pedidosPath = path.join(__dirname, '../data/pedidos.json');

module.exports = {
    listarPedidos() {
        if (!fs.existsSync(pedidosPath)) {
            return [];
        }

        const dados = fs.readFileSync(pedidosPath, 'utf8');
        return JSON.parse(dados);
    },

    salvar(pedidos) {
        fs.writeFileSync(pedidosPath, JSON.stringify(pedidos, null, 2), 'utf8');
    },

    cadastrar(novoPedido) {
        const pedidos = this.listarPedidos();
        const novoId = pedidos.reduce((max, p) => Math.max(max, p.id), 0) + 1;
        novoPedido.id = novoId;
        pedidos.push(novoPedido);
        this.salvar(pedidos);
        return novoPedido;
    }
}