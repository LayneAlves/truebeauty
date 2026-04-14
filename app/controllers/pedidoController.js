const PedidoModel = require('../models/pedidoModel');
const PedidoController = {
  
  async listarPedidos(req, res) {
        try {
            const pedidos = PedidoModel.listarPedidos();

            res.render('pedidos', { pedidos: pedidos });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao listar pedidos");
        }
    }
};

module.exports = PedidoController;

