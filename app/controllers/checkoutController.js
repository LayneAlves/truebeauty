// const UserModel = require('../models/userModel');
// const PedidoModel = require('../models/pedidoModel');
// const ProdutoModel = require('../models/produtoModel'); // ← sobe para o topo
// const jwt = require('jsonwebtoken');
// const SECRET = 'ChaveSecreta';

// const CheckoutController = {
//   async finalizar(req, res) {
//     try {
//       const {
//         nome, email, telefone,
//         cep, endereco, numero, complemento,
//         bairro, cidade, estado,
//         carrinho
//       } = req.body;

//       const token = req.cookies.token;
//       let usuarioLogado = null;

//       if (token) {
//         try {
//           usuarioLogado = jwt.verify(token, SECRET);
//         } catch (e) {
//           // token inválido, continua sem usuário
//         }
//       }

//       const total = carrinho.reduce((sum, item) => {
//         const preco = parseFloat(
//           String(item.preco).replace('R$', '').replace(',', '.').trim()
//         );
//         return sum + preco * item.quantidade;
//       }, 0);

//       if (usuarioLogado) {
//         await UserModel.atualizarEndereco(usuarioLogado.id, {
//           telefone, cep, endereco, numero, complemento, bairro, cidade, estado
//         });
//       }

//       // ← decrementa antes de salvar o pedido
//       await ProdutoModel.decrementarEstoque(carrinho);

//       const novoPedido = {
//         cliente_nome: nome,
//         cliente_email: email,
//         telefone,
//         endereco: `${endereco}, ${numero} - ${bairro}, ${cidade}/${estado} - CEP: ${cep}`,
//         complemento,
//         data: new Date().toISOString().split('T')[0],
//         total: total.toFixed(2),
//         status: 'pendente',
//         pagamento: 'A definir',
//         itens: carrinho,
//         usuario_id: usuarioLogado?.id || null
//       };

//       await PedidoModel.cadastrar(novoPedido);

//       return res.json({ sucesso: true });

//     } catch (error) {
//       console.error('Erro ao finalizar pedido:', error);
//       // Se o erro for de estoque insuficiente, retorna mensagem específica
//       if (error.message.includes('Estoque insuficiente')) {
//         return res.status(400).json({ sucesso: false, mensagem: error.message });
//       }
//       return res.status(500).json({ sucesso: false, mensagem: 'Erro interno' });
//     }
//   }
// };

// module.exports = CheckoutController;