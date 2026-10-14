document.documentElement.classList.add('js');

const observador = new IntersectionObserver(entradas => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observador.observe(el));

const topo = document.querySelector('.topo');

function atualizarTopo() {
  topo.classList.toggle('rolou', window.scrollY > 40);
}

window.addEventListener('scroll', atualizarTopo);
atualizarTopo();

const itens = document.querySelectorAll('.faq details');

itens.forEach(item => {
  const resumo = item.querySelector('summary');

  resumo.addEventListener('click', evento => {
    evento.preventDefault();

    if (item.classList.contains('aberto')) {
      fechar(item);
    } else {
      itens.forEach(outro => {
        if (outro !== item) fechar(outro);
      });
      abrir(item);
    }
  });
});

function abrir(item) {
  item.open = true;
  requestAnimationFrame(() => item.classList.add('aberto'));
}

function fechar(item) {
  item.classList.remove('aberto');
  setTimeout(() => {
    if (!item.classList.contains('aberto')) item.open = false;
  }, 400);
}

const botaoMenu = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

botaoMenu.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  botaoMenu.setAttribute('aria-expanded', aberto);
});

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
  });
});