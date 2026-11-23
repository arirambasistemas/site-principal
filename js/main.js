const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

// Consentimento de cookies (LGPD): o pixel só carrega após "Aceitar"
(() => {
  const box = $('#cookieBox');
  if (!box) return;
  const KEY = 'ariramba-cookies';
  let choice = null;
  try { choice = localStorage.getItem(KEY); } catch (e) {}
  const open = () => { box.hidden = false; requestAnimationFrame(() => box.classList.add('show')); };
  const close = () => { box.classList.remove('show'); setTimeout(() => { box.hidden = true; }, 250); };
  if (!choice) setTimeout(open, 1200);
  $$('[data-cookie]', box).forEach((b) => b.addEventListener('click', () => {
    const v = b.dataset.cookie;
    try { localStorage.setItem(KEY, v); } catch (e) {}
    if (v === 'aceito' && typeof window.loadOaiPixel === 'function') window.loadOaiPixel();
    close();
  }));
  const prefs = $('#cookiePrefs');
  if (prefs) prefs.addEventListener('click', open);
})();

$('#year').textContent = new Date().getFullYear();

// Cabeçalho com sombra e botão de voltar ao topo
const header = $('#siteHeader');
const toTop = $('#toTop');
const onScroll = () => {
  const y = scrollY;
  header.classList.toggle('scrolled', y > 8);
  toTop.classList.toggle('show', y > 700);
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();
toTop.addEventListener('click', () => scrollTo({ top: 0 }));

// Menu: destaca a seção visível
const links = $$('.menu a');
const spy = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach((s) => spy.observe(s));

// Menu mobile
const burger = $('#burger');
const mobileMenu = $('#mobileMenu');
const setMenu = (open) => {
  mobileMenu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
};
burger.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
$$('#mobileMenu a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// Revelação ao rolar (só elementos abaixo da dobra têm a classe .rv)
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  });
}, { threshold: 0.12 });
$$('.rv').forEach((el) => io.observe(el));

// Formulário (validação; envio real depende de backend)
const form = $('#leadForm');
const msg = $('#formMsg');
const showMsg = (text, ok) => {
  msg.textContent = text;
  msg.className = 'form-msg show ' + (ok ? 'ok' : 'bad');
};
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const okEmail = /^\S+@\S+\.\S+$/.test(email);
  form.name.closest('.field').classList.toggle('err', !name);
  form.email.closest('.field').classList.toggle('err', !okEmail);
  if (!name || !okEmail) { showMsg('Informe seu nome e um e-mail válido.', false); return; }
  showMsg('Recebido, ' + name + '! Entraremos em contato em até 48h. (Protótipo: o envio real depende de um backend.)', true);
  form.reset();
});

// Portfólio: filtro por tipo
(() => {
  const btns = $$('.filters button');
  const cards = $$('#pfGrid .pf');
  btns.forEach((b) => b.addEventListener('click', () => {
    btns.forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
    cards.forEach((c) => { c.hidden = b.dataset.f !== 'todos' && c.dataset.cat !== b.dataset.f; });
  }));
})();
