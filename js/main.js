const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

$('#year').textContent = new Date().getFullYear();

// Título do hero: palavra por palavra
(() => {
  const h = $('#heroTitle');
  const walk = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((t) => {
          if (!t) return;
          if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(t)); return; }
          const s = document.createElement('span');
          s.className = 'w'; s.style.setProperty('--i', hWords++); s.textContent = t;
          frag.appendChild(s);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) walk(n);
    });
  };
  let hWords = 0;
  walk(h);
})();

// Barra de progresso de leitura + cabeçalho que some ao descer
const header = $('#siteHeader');
let lastY = 0;
const onScroll = () => {
  const y = scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;
  $('#readProgress').style.setProperty('--sp', max > 0 ? (y / max).toFixed(4) : 0);
  header.classList.toggle('scrolled', y > 24);
  header.classList.remove('hidden');
  lastY = y;
  $('#toTop').classList.toggle('show', y > 600);
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Navegação desktop: destaca a seção visível e move o indicador.
const menuLinks = $$('.menu a[data-spy]');
const pill = $('#pillInd');
const movePillTo = (link) => {
  if (!link) { pill.style.width = '0px'; return; }
  pill.style.left = link.offsetLeft + 'px';
  pill.style.width = link.offsetWidth + 'px';
};
const menuSpy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const activeId = entry.target.id;
    menuLinks.forEach((link) => link.classList.toggle('active', link.dataset.spy === activeId));
    movePillTo(menuLinks.find((link) => link.dataset.spy === activeId));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach((section) => menuSpy.observe(section));
menuLinks.forEach((link) => link.addEventListener('mouseenter', () => movePillTo(link)));
$('#menu').addEventListener('mouseleave', () => movePillTo(menuLinks.find((link) => link.classList.contains('active'))));
addEventListener('resize', () => movePillTo(menuLinks.find((link) => link.classList.contains('active'))));

// Navegação mobile.
const burger = $('#burger');
const mobileMenu = $('#mobileMenu');
const setMobileMenu = (open) => {
  mobileMenu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
};
burger.addEventListener('click', () => setMobileMenu(!mobileMenu.classList.contains('open')));
$$('#mobileMenu a').forEach((link) => link.addEventListener('click', () => setMobileMenu(false)));
addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMobileMenu(false);
});

// Revelação ao rolar
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  });
}, { threshold: 0.15 });
$$('.reveal').forEach((el) => io.observe(el));

// Processo em tela cheia: a etapa ativa ocupa a tela inteira
(() => {
  const steps = [
    ['01', 'Diagnóstico', 'Entendemos o seu problema', 'Conversamos para entender o que toma o seu tempo e priorizamos o que traz resultado mais rápido.', '24h a 48h'],
    ['02', 'Planejamento', 'Desenhamos a solução', 'Definimos escopo, fluxos e tecnologias antes de escrever a primeira linha de código.', '3 a 7 dias'],
    ['03', 'Desenvolvimento', 'Construímos com você', 'Desenvolvemos com apoio de IA para entregar mais rápido e com mais qualidade, em partes curtas que você acompanha e aprova.', '2 a 6 semanas'],
    ['04', 'Validação', 'Testamos antes de publicar', 'Testamos desempenho, segurança e usabilidade, com revisão assistida por IA, antes de colocar no ar.', '3 a 7 dias'],
    ['05', 'Suporte', 'Cuidamos depois do lançamento', 'Hospedagem, monitoramento, manutenção e melhorias para o projeto continuar funcionando e evoluindo.', 'Contínuo'],
  ];
  const stage = document.getElementById('pstage');
  const dots = [...document.querySelectorAll('#pdots li')];
  let current = -1;
  const show = (i) => {
    if (i === current) return;
    const first = current === -1;
    current = i;
    const [num, title, kick, desc, dur] = steps[i];
    const apply = () => {
      document.getElementById('pnum').textContent = num;
      document.getElementById('ptitle').textContent = title;
      document.getElementById('pkick').textContent = kick;
      document.getElementById('pdesc').textContent = desc;
      document.getElementById('pdur').textContent = dur;
      document.getElementById('pcount').textContent = num + ' / 05';
      document.querySelectorAll('#pstage .pbg-i').forEach((el, k) => el.classList.toggle('on', k === i));
      dots.forEach((d, k) => { d.classList.toggle('on', k <= i); d.classList.toggle('cur', k === i); });
      document.getElementById('pHint').classList.toggle('gone', i > 0);
    };
    if (first || reduce) { apply(); return; }
    stage.classList.add('swap');
    setTimeout(() => { apply(); stage.classList.remove('swap'); }, 150);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) show(+en.target.dataset.i); });
  }, { rootMargin: '-45% 0px -45% 0px' });
  document.querySelectorAll('.pstep').forEach((el) => io.observe(el));
  show(0);

  // Navegação: pontos, setas e teclado levam à posição da etapa na rolagem
  const story = document.getElementById('pstory');
  const goTo = (i) => {
    const base = story.getBoundingClientRect().top + scrollY;
    const top = i > 4 ? base + 6 * innerHeight : base + (Math.max(0, i) + 1) * innerHeight;
    scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
  };
  document.querySelectorAll('#pdots button').forEach((b) => b.addEventListener('click', () => goTo(+b.dataset.go)));
  addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    if (/input|textarea|select/i.test(document.activeElement.tagName)) return;
    const r = stage.getBoundingClientRect();
    if (r.top > 1 || r.bottom < innerHeight - 1) return;
    e.preventDefault();
    goTo(current + (e.key === 'ArrowRight' ? 1 : -1));
  });
})();

// Contadores
const co = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    const el = en.target, target = +el.dataset.count;
    const pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    if (reduce) { el.textContent = pre + target + suf; co.unobserve(el); return; }
    const start = performance.now(), dur = 1400;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      el.textContent = pre + Math.round(target * (1 - Math.pow(1 - t, 3))) + suf;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    co.unobserve(el);
  });
}, { threshold: 0.5 });
$$('[data-count]').forEach((el) => co.observe(el));

// Botões magnéticos
if (!reduce && matchMedia('(pointer: fine)').matches) {
  $$('.magnetic').forEach((b) => {
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.22;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      b.style.transform = `translate(${x}px, ${y}px)`;
    });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });

  // Brilho do cursor nos cards
  $$('.svc, .sc').forEach((card) => card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }));
}

// Voltar ao topo
$('#toTop').addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

// Formulário (validação; envio real depende de backend)
const form = $('#leadForm'), msg = $('#formMsg');
const showMsg = (text, ok, icon) => {
  msg.innerHTML = `<svg class="ico" style="color:${ok ? '#F8D39E' : '#F28B7E'}"><use href="#${icon}"/></svg><span></span>`;
  msg.querySelector('span').textContent = text;
  msg.style.color = ok ? '#F8D39E' : '#F28B7E';
  msg.classList.add('show');
};
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim(), email = form.email.value.trim();
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
    showMsg('Informe seu nome e um e-mail válido.', false, 'i-alert');
    form.classList.remove('shake'); void form.offsetWidth; form.classList.add('shake');
    return;
  }
  showMsg('Recebido, ' + name + '! Entraremos em contato em até 48h. (Protótipo: o envio real depende de um backend.)', true, 'i-check');
  form.reset();
});

// Faixa de tecnologias: cartões gerados em JS e duplicados para loop contínuo
const TECH = [
  { n: 'React', s: 'react', c: '#61DAFB', d: 'Interfaces rápidas e reativas', k: 'Frontend' },
  { n: 'TypeScript', s: 'typescript', c: '#3178C6', d: 'Código seguro e tipado', k: 'Frontend' },
  { n: 'Material UI', s: 'mui', c: '#007FFF', d: 'Componentes consistentes e acessíveis', k: 'Frontend' },
  { n: 'React Native', s: 'react', c: '#61DAFB', d: 'Apps nativos multiplataforma', k: 'Mobile' },
  { n: 'Flutter', s: 'flutter', c: '#54C5F8', d: 'Apps de alta fluidez', k: 'Mobile' },
  { n: 'Django', s: 'django', c: '#44B78B', d: 'Backend robusto e seguro', k: 'Backend' },
  { n: 'FastAPI', s: 'fastapi', c: '#009688', d: 'APIs rápidas e documentadas', k: 'Backend' },
  { n: 'PostgreSQL', s: 'postgresql', c: '#4169E1', d: 'Dados confiáveis e escaláveis', k: 'Dados' },
  { n: 'MySQL', s: 'mysql', c: '#4479A1', d: 'Banco relacional confiável', k: 'Dados' },
  { n: 'Redis', s: 'redis', c: '#FF4438', d: 'Cache e respostas instantâneas', k: 'Dados' },
  { n: 'Docker', s: 'docker', c: '#2496ED', d: 'Ambientes isolados e portáveis', k: 'Infra' },
  { n: 'Kubernetes', s: 'kubernetes', c: '#326CE5', d: 'Orquestração e escala automática', k: 'Infra' },
  { n: 'Linux / VPS', s: 'linux', c: '#FCC624', d: 'Servidores estáveis e seguros', k: 'Infra' },
  { n: 'CI/CD', s: null, c: '#F8D39E', d: 'Entregas automáticas e frequentes', k: 'Infra' },
  { n: 'n8n', s: 'n8n', c: '#EA4B71', d: 'Automações visuais sem fricção', k: 'Automação' },
  { n: 'MCP', s: null, c: '#F8D39E', d: 'Seu site atualizado por qualquer IA', k: 'IA' },
  { n: 'LangChain', s: 'langchain', c: '#7DD3FC', d: 'Agentes de IA conectados', k: 'IA' },
  { n: 'Evolution API', s: null, c: '#F19986', d: 'Integração com WhatsApp', k: 'Integração' },
  { n: 'WhatsApp', s: 'whatsapp', c: '#25D366', d: 'Atendimento e vendas automáticos', k: 'Integração' },
  { n: 'Telegram', s: 'telegram', c: '#26A5E4', d: 'Bots e notificações rápidas', k: 'Integração' },
];
const CDN = 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/';
const strip = document.getElementById('tStrip');
const makeCard = (t, dup) => {
  const card = document.createElement('article');
  card.className = 'tcard';
  if (dup) card.setAttribute('aria-hidden', 'true');
  card.style.setProperty('--c', t.c);
  const logo = document.createElement('div');
  logo.className = 'tlogo';
  logo.innerHTML = '<span class="mk" aria-hidden="true"></span><span class="tinit">' + t.n[0] + '</span>';
  if (t.s) {
    const url = CDN + t.s + '.svg';
    logo.style.setProperty('--src', `url("${url}")`);
    const probe = new Image();
    probe.onerror = () => logo.classList.add('nologo');
    probe.src = url;
  } else {
    logo.classList.add('nologo');
  }
  const h = document.createElement('h3'); h.textContent = t.n;
  const p = document.createElement('p'); p.textContent = t.d;
  const k = document.createElement('span'); k.className = 'tcat'; k.textContent = t.k;
  card.append(k, logo, h, p);
  return card;
};
// Duas cópias da lista: a animação leva de 0 a -50%, então o loop é contínuo
TECH.forEach((t) => strip.appendChild(makeCard(t, false)));
TECH.forEach((t) => strip.appendChild(makeCard(t, true)));

// Hero: ícones surgem e, depois, os textos são digitados
(() => {
  const meta = document.querySelector('.hero-meta');
  if (!meta || reduce) return;
  const items = [...meta.children];
  const els = items.flatMap((it) => [...it.querySelectorAll('.t')]);
  const full = els.map((el) => el.textContent);
  meta.style.minHeight = meta.offsetHeight + 'px';
  els.forEach((el) => { el.textContent = ''; });
  items.forEach((it, k) => it.style.setProperty('--k', k));
  meta.classList.add('go');
  const type = (i) => {
    if (i >= els.length) return;
    const el = els[i], txt = full[i];
    el.classList.add('typing');
    let n = 0;
    const tick = () => {
      el.textContent = txt.slice(0, ++n);
      if (n < txt.length) setTimeout(tick, el.tagName === 'B' ? 55 : 38);
      else { el.classList.remove('typing'); setTimeout(() => type(i + 1), el.tagName === "B" ? 420 : 120); }
    };
    tick();
  };
  setTimeout(() => type(0), items.length * 420 + 400);
})();
