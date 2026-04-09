// !-- Js Perfil -->

const btnAbrirPerfil = document.querySelector('.user-icon');
const modalPerfil = document.getElementById('modal-perfil');
const overlayPerfil = document.getElementById('overlay-perfil');
const btnFecharPerfil = document.getElementById('fechar-perfil');

function abrirPerfil() {
  modalPerfil.classList.add('ativo');
  overlayPerfil.classList.add('ativo');
  // Bloqueia o scroll do corpo da página
  document.body.style.overflow = 'hidden';
}

function fecharPerfil() {
  modalPerfil.classList.remove('ativo');
  overlayPerfil.classList.remove('ativo');
  // Devolve o scroll ao fechar
  document.body.style.overflow = 'auto';
}

btnAbrirPerfil.addEventListener('click', abrirPerfil);
btnFecharPerfil.addEventListener('click', fecharPerfil);
overlayPerfil.addEventListener('click', fecharPerfil);



//  <!-- Validação login -->

addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-perfil');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.email.value;
    const senha = form.senha.value;

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      const resultado = await response.json();
      if (resultado.sucesso) {
        alert('Login bem-sucedido!');
        window.location.href = resultado.redirectUrl;
        
      } else {
        alert('Email ou senha incorretos. Tente novamente.');
      
      }
  
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Ocorreu um erro. Tente novamente mais tarde.');
    }
  });
});

// <!-- Fim perfil -->



// <!-- menu hamburguer -->
<div id="overlay" class="overlay"></div>


  const menuToggle = document.getElementById('menu-toggle');
  const sideMenu = document.getElementById('side-menu');
  const overlay = document.getElementById('overlay');

  menuToggle.addEventListener('click', () => {
    sideMenu.classList.toggle('open');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    sideMenu.classList.remove('open');
    overlay.classList.remove('active');
  });
// Fim do menu hamb


// <!-- JS DO MENU HAMBURGUER-->

  document.querySelectorAll('.submenu-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const target = document.querySelector(button.dataset.target);
      const expanded = button.getAttribute('aria-expanded') === 'true';

      // fecha todos os outros submenus primeiro
      document.querySelectorAll('.submenu').forEach(sub => {
        if (sub !== target) sub.classList.remove('show');
      });
      document.querySelectorAll('.submenu-toggle').forEach(btn => {
        if (btn !== button) btn.setAttribute('aria-expanded', 'false');
      });

      // alterna o submenu clicado
      button.setAttribute('aria-expanded', !expanded);
      target.classList.toggle('show', !expanded);
    });
  });






// <!--Pesquisa overlay-->

  const searchContainer = document.querySelector('.search-icon');
  const lupaBtnImg = searchContainer.querySelector('img');
  const searchInput = searchContainer.querySelector('.search-input');
  const overlayPesquisa = document.getElementById('overlay-pesquisa');

  let pesquisaAtiva = false;

  function setPesquisaAtiva(ativo) {
    pesquisaAtiva = ativo;

    searchContainer.classList.toggle('active', ativo);
    searchInput.classList.toggle('active', ativo);
    overlayPesquisa.classList.toggle('ativo', ativo);

    // Blur apenas no mobile/tablet
    if (window.matchMedia('(max-width: 991px)').matches) {
      document.body.classList.toggle('blurred', ativo);
    } else {
      document.body.classList.remove('blurred');
    }

    if (ativo) {
      searchInput.focus();
    } else {
      searchInput.blur();
    }
  }

  // Clique na lupa: alterna abrir/fechar
  lupaBtnImg.addEventListener('click', (e) => {
    e.stopPropagation(); // impede que o clique vá pro document
    if (pesquisaAtiva) {
      // Se já estiver ativa, fecha
      setPesquisaAtiva(false);
    } else {
      // Se estiver fechada, abre
      setPesquisaAtiva(true);
    }
  });

  // Impede que cliques dentro da área da busca fechem o campo
  searchContainer.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Clique fora: fecha
  document.addEventListener('click', () => {
    if (pesquisaAtiva) {
      setPesquisaAtiva(false);
    }
  });


  // Redimensionamento: garante que feche em telas grandes
  window.addEventListener('resize', () => {
    if (!window.matchMedia('(max-width: 991px)').matches) {
      setPesquisaAtiva(false);
    }
  });
