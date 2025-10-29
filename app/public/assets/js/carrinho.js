// Sistema de Carrinho com localStorage
class Carrinho {
  constructor() {
    this.itens = this.carregarCarrinho();
    this.inicializar();
  }

  // Carrega itens do localStorage
  carregarCarrinho() {
    const carrinho = localStorage.getItem('carrinho');
    return carrinho ? JSON.parse(carrinho) : [];
  }

  // Salva itens no localStorage
  salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(this.itens));
  }

  // Adiciona produto ao carrinho
  adicionarItem(produto) {
    const itemExistente = this.itens.find(item => item.id === produto.id);
    
    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      this.itens.push({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        imagem: produto.imagem,
        quantidade: 1
      });
    }
    
    this.salvarCarrinho();
    this.atualizarSacola();
    this.abrirSacola();
  }

  // Remove produto do carrinho
  removerItem(id) {
    this.itens = this.itens.filter(item => item.id !== id);
    this.salvarCarrinho();
    this.atualizarSacola();
  }

  // Altera a quantidade de um item
  alterarQuantidade(id, quantidade) {
    const item = this.itens.find(item => item.id === id);
    if (item) {
      item.quantidade = parseInt(quantidade);
      if (item.quantidade <= 0) {
        this.removerItem(id);
      } else {
        this.salvarCarrinho();
        this.atualizarSacola();
      }
    }
  }

  // Calcula total do carrinho
  calcularTotal() {
    return this.itens.reduce((total, item) => {
      return total + (parseFloat(item.preco.replace('R$', '').replace(',', '.')) * item.quantidade);
    }, 0);
  }

  // Limpa o carrinho
  limparCarrinho() {
    this.itens = [];
    this.salvarCarrinho();
    this.atualizarSacola();
  }

  // Atualiza visual da sacola
  atualizarSacola() {
    const sacola = document.getElementById('sacola-lateral');
    const container = sacola.querySelector('.itens-container') || this.criarContainerItens(sacola);
    
    container.innerHTML = '';
    
    if (this.itens.length === 0) {
      container.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio</p>';
    } else {
      this.itens.forEach(item => {
        const itemElement = this.criarItemSacola(item);
        container.appendChild(itemElement);
      });
    }

    this.atualizarTotal();
  }

  // Cria container de itens na sacola
  criarContainerItens(sacola) {
    const container = document.createElement('div');
    container.className = 'itens-container';
    
    const btnFinalizar = sacola.querySelector('.btn-finalizar');
    sacola.insertBefore(container, btnFinalizar);
    return container;
  }

  // Cria elemento de item
  criarItemSacola(item) {
    const div = document.createElement('div');
    div.className = 'item-sacola';
    div.innerHTML = `
      <div class="info-item">
        <img src="${item.imagem}" alt="${item.nome}">
        <p><strong>${item.nome}</strong></p>
        <p>${item.preco}</p>
      </div>
      <div class="acoes-item">
        <input type="number" min="1" value="${item.quantidade}" class="input-quantidade" data-id="${item.id}">
        <button class="btn-excluir" data-id="${item.id}">Excluir</button>
      </div>
    `;

    const inputQuantidade = div.querySelector('.input-quantidade');
    const btnExcluir = div.querySelector('.btn-excluir');

    inputQuantidade.addEventListener('change', (e) => {
      this.alterarQuantidade(item.id, e.target.value);
    });

    btnExcluir.addEventListener('click', () => {
      this.removerItem(item.id);
    });

    return div;
  }

  // Atualiza o total do carrinho
  atualizarTotal() {
    let totalElement = document.querySelector('.total-carrinho');
    const total = this.calcularTotal();

    if (!totalElement) {
      totalElement = document.createElement('div');
      totalElement.className = 'total-carrinho';
      const btnFinalizar = document.querySelector('.btn-finalizar');
      btnFinalizar.parentNode.insertBefore(totalElement, btnFinalizar);
    }

    if (this.itens.length === 0) {
      totalElement.innerHTML = '';
      totalElement.remove();
    } else {
      totalElement.innerHTML = `<strong>Total: R$ ${total.toFixed(2).replace('.', ',')}</strong>`;
    }
  }

  // Abre sacola lateral
  abrirSacola() {
    const sacola = document.getElementById('sacola-lateral');
    const overlay = document.getElementById('overlay-sacola');
    sacola.classList.add('aberta');
    overlay.classList.add('ativo');
  }

  // Fecha sacola lateral
  fecharSacola() {
    const sacola = document.getElementById('sacola-lateral');
    const overlay = document.getElementById('overlay-sacola');
    sacola.classList.remove('aberta');
    overlay.classList.remove('ativo');
  }

  // Inicializa eventos
  inicializar() {
    const btnAbrirSacola = document.querySelector('.cart-icon');
    const btnFecharSacola = document.getElementById('fechar-sacola');
    const overlay = document.getElementById('overlay-sacola');
    const btnFinalizar = document.querySelector('.btn-finalizar');

    btnAbrirSacola.addEventListener('click', () => this.abrirSacola());
    btnFecharSacola.addEventListener('click', () => this.fecharSacola());
    overlay.addEventListener('click', () => this.fecharSacola());
    
    btnFinalizar.addEventListener('click', () => {
      if (this.itens.length > 0) {
        window.location.href = '/checkout.html';
        this.limparCarrinho();
      } else {
        alert('Seu carrinho está vazio!');
      }
    });

    this.configurarBotoesComprar();
    this.atualizarSacola();
  }

  // Configura botões de "Comprar" nos produtos
  configurarBotoesComprar() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('card-button') || e.target.textContent === 'Comprar') {
        e.preventDefault();
        
        const card = e.target.closest('section') || e.target.closest('.card-destaque');
        if (!card) return;

        const produto = this.extrairDadosProduto(card);
        this.adicionarItem(produto);
      }
    });
  }

  // Extrai dados do produto do card
  extrairDadosProduto(card) {
    const img = card.querySelector('img');
    const titulo = card.querySelector('.card-title, h3');
    const preco = card.querySelector('.card-price, .preco');
    
    return {
      id: Date.now() + Math.random(),
      nome: titulo ? titulo.textContent.trim() : 'Produto',
      preco: preco ? preco.textContent.trim() : 'R$ 0,00',
      imagem: img ? img.src : '/assets/imagem/default.jpg'
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.carrinho = new Carrinho();
});
