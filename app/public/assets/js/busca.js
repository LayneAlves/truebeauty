(function () {
 
  const paginas = [
    // Páginas principais
    { titulo: "Início",            url: "/" },
    { titulo: "Ver Tudo",          url: "/vertudo" },
    { titulo: "Carrinho",          url: "/carrinho" },
    { titulo: "Checkout",          url: "/checkout" },
    { titulo: "Cadastro",          url: "/cadastro" },
    { titulo: "Minha Conta",       url: "/conta" },
    { titulo: "Endereço",          url: "/endereco" },
 
    // Categorias
    { titulo: "Ver Tudo",          url: "/categoria" },
    { titulo: "Perfumes",          url: "/categoria?categoria=perfumes" },
    { titulo: "Cabelo",            url: "/categoria?categoria=cabelos" },
    { titulo: "Maquiagem",         url: "/categoria?categoria=maquiagens" },
    { titulo: "Skin Care",         url: "/categoria?categoria=skin_care" },
    { titulo: "Cuidados Pessoais", url: "/categoria?categoria=cuidados_pessoais" },
 
    // Subcategorias - Perfumes
    { titulo: "Perfume Feminino",  url: "/categoria?subcategoria=perfumes_feminino" },
    { titulo: "Perfume Masculino", url: "/categoria?subcategoria=perfumes_masculino" },
    { titulo: "Perfume Infantil",  url: "/categoria?subcategoria=perfumes_infantil" },
    { titulo: "Body Splash",       url: "/categoria?subcategoria=body_splash" },
 
    // Subcategorias - Cabelo
    { titulo: "Hidratação",        url: "/categoria?subcategoria=hidratacao" },
    { titulo: "Nutrição",          url: "/categoria?subcategoria=nutricao" },
    { titulo: "Reconstrução",      url: "/categoria?subcategoria=reconstrucao" },
 
    // Subcategorias - Cuidados Pessoais
    { titulo: "Depilação",         url: "/categoria?subcategoria=depilacao" },
    { titulo: "Higiene Íntima",    url: "/categoria?subcategoria=higiene_intima" },
    { titulo: "Protetor Solar",    url: "/categoria?subcategoria=protetor_solar" },
    { titulo: "Kit de Barbear",    url: "/categoria?subcategoria=kit_barba" },
 
    // Subcategorias - Maquiagem
    { titulo: "Primer",            url: "/categoria?subcategoria=primer" },
    { titulo: "Base",              url: "/categoria?subcategoria=base" },
    { titulo: "Corretivo",         url: "/categoria?subcategoria=corretivo" },
    { titulo: "Pó",                url: "/categoria?subcategoria=po" },
    { titulo: "Batom",             url: "/categoria?subcategoria=batom" },
    { titulo: "Olho",              url: "/categoria?subcategoria=olho" },
 
    // Subcategorias - Skin Care
    { titulo: "Rosto",             url: "/categoria?subcategoria=rosto" },
    { titulo: "Olhos",             url: "/categoria?subcategoria=olhos" },
    { titulo: "Lábios",            url: "/categoria?subcategoria=labios" },
  ];
 
  const sugestoesBox = document.createElement('div');
  sugestoesBox.id = 'search-sugestoes';
  sugestoesBox.style.cssText = `
    position: fixed;
    background: #fff;
    border: 1px solid #e0d6d0;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.10);
    z-index: 9999;
    max-height: 320px;
    overflow-y: auto;
    display: none;
    min-width: 280px;
  `;
  document.body.appendChild(sugestoesBox);
 
  const input   = document.getElementById('search-input-global');
  const icon    = document.querySelector('.search-icon');
  const overlay = document.getElementById('overlay-pesquisa');
 
  icon.addEventListener('click', () => {
    const aberto = input.classList.toggle('ativo');
    overlay.classList.toggle('ativo', aberto);
    if (aberto) {
      input.focus();
    } else {
      fecharBusca();
    }
  });
 
  overlay.addEventListener('click', fecharBusca);
 
  function normalizar(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
 
  input.addEventListener('input', () => {
    const q = normalizar(input.value.trim());
    if (!q) { sugestoesBox.style.display = 'none'; return; }
 
    const filtradas = paginas.filter(p => normalizar(p.titulo).includes(q));
 
    if (!filtradas.length) {
      sugestoesBox.innerHTML = '<div style="padding:12px 16px;color:#999;font-size:14px;">Nenhum resultado encontrado</div>';
    } else {
      sugestoesBox.innerHTML = filtradas.map((p, i) => `
        <a href="${p.url}" style="
          display:block; padding:11px 16px; font-size:14px;
          color:#333; text-decoration:none;
          border-top:${i > 0 ? '1px solid #f0e8e4' : 'none'};
          font-family:'Lora',serif;
        "
        onmouseover="this.style.background='#fdf5f0'"
        onmouseout="this.style.background='transparent'">
          ${p.titulo}
        </a>
      `).join('');
    }
 
    const rect = input.getBoundingClientRect();
    sugestoesBox.style.top   = (rect.bottom + 6) + 'px';
    sugestoesBox.style.left  = rect.left + 'px';
    sugestoesBox.style.width = rect.width + 'px';
    sugestoesBox.style.display = 'block';
  });
 
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#search-input-global') && !e.target.closest('#search-sugestoes')) {
      sugestoesBox.style.display = 'none';
    }
  });
 
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = normalizar(input.value.trim());
      const match = paginas.find(p => normalizar(p.titulo).includes(q));
      if (match) window.location.href = match.url;
    }
    if (e.key === 'Escape') fecharBusca();
  });
 
  function fecharBusca() {
    input.classList.remove('ativo');
    overlay.classList.remove('ativo');
    sugestoesBox.style.display = 'none';
    input.value = '';
  }
 
})();