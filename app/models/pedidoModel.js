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
    }
}