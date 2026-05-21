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
    },

    async excluirPedido(req, res) {
        try {
            const id = parseInt(req.params.id);
            const pedidos = PedidoModel.listarPedidos();
            const novosPedidos = pedidos.filter(p => p.id !== id);
            PedidoModel.salvar(novosPedidos);
            res.redirect('/pedidos');
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao excluir pedido");
        }
    },

    async verPedido(req, res) {
        try {
            const id = parseInt(req.params.id);
            const pedidos = PedidoModel.listarPedidos();
            const pedido = pedidos.find(p => p.id === id);

            if (!pedido) {
                return res.status(404).json({ mensagem: 'Pedido não encontrado' });
            }

            return res.json(pedido);
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao buscar pedido");
        }
    }
};

module.exports = PedidoController;

