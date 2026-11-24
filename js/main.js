const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

// Consentimento de cookies (LGPD): o pixel só carrega após "Aceitar"
(() => {
  const box = $('#cookieBox');
  if (!box) return;
  const KEY = 'ariramba-cookies';
  let choice = null;
  let opener = null;
  try { choice = localStorage.getItem(KEY); } catch (e) {}

  const open = (userTriggered = false, triggerEl = null) => {
    opener = triggerEl;
    box.hidden = false;
    requestAnimationFrame(() => {
      box.classList.add('show');
      if (userTriggered) {
        const title = $('#cookieTitle', box);
        if (title) {
          title.setAttribute('tabindex', '-1');
          title.focus();
        }
      }
    });
  };

  const close = () => {
    box.classList.remove('show');
    setTimeout(() => {
      box.hidden = true;
      if (opener && typeof opener.focus === 'function') {
        opener.focus();
        opener = null;
      }
    }, 250);
  };

  if (!choice) setTimeout(() => open(false), 1200);

  $$('[data-cookie]', box).forEach((b) => b.addEventListener('click', () => {
    const v = b.dataset.cookie;
    try { localStorage.setItem(KEY, v); } catch (e) {}
    if (v === 'aceito' && typeof window.loadOaiPixel === 'function') window.loadOaiPixel();
    close();
  }));

  const prefs = $('#cookiePrefs');
  if (prefs) prefs.addEventListener('click', (e) => open(true, e.currentTarget));

  box.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
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
  if (!open && document.activeElement && mobileMenu.contains(document.activeElement)) {
    burger.focus();
  }
};
burger.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
$$('#mobileMenu a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
    setMenu(false);
    burger.focus();
  }
});

// Revelação ao rolar (só elementos abaixo da dobra têm a classe .rv)
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  });
}, { threshold: 0.12 });
$$('.rv').forEach((el) => io.observe(el));

// Formulário (validação acessível; envio real depende de backend)
const form = $('#leadForm');
const msg = $('#formMsg');
const showMsg = (text, ok) => {
  msg.textContent = text;
  msg.className = 'form-msg show ' + (ok ? 'ok' : 'bad');
};

const setFieldError = (input, errorEl, hasError) => {
  const field = input.closest('.field');
  if (!field) return;
  field.classList.toggle('err', hasError);
  if (hasError) {
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', errorEl.id);
  } else {
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameInput = form.name;
  const emailInput = form.email;
  const nameError = $('#name-error');
  const emailError = $('#email-error');

  const nameVal = nameInput.value.trim();
  const emailVal = emailInput.value.trim();
  const hasNameError = !nameVal;
  const hasEmailError = !/^\S+@\S+\.\S+$/.test(emailVal);

  setFieldError(nameInput, nameError, hasNameError);
  setFieldError(emailInput, emailError, hasEmailError);

  if (hasNameError || hasEmailError) {
    const errorCount = (hasNameError ? 1 : 0) + (hasEmailError ? 1 : 0);
    showMsg(`Por favor, corrija o(s) ${errorCount} campo(s) destacado(s) abaixo.`, false);
    if (hasNameError) {
      nameInput.focus();
    } else {
      emailInput.focus();
    }
    return;
  }

  showMsg(`Recebido, ${nameVal}! Entraremos em contato em até 48h.`, true);
  nameInput.removeAttribute('aria-invalid');
  nameInput.removeAttribute('aria-describedby');
  emailInput.removeAttribute('aria-invalid');
  emailInput.removeAttribute('aria-describedby');
  nameInput.closest('.field').classList.remove('err');
  emailInput.closest('.field').classList.remove('err');
  form.reset();
});

form.name.addEventListener('input', () => {
  if (form.name.value.trim()) {
    setFieldError(form.name, $('#name-error'), false);
  }
});
form.email.addEventListener('input', () => {
  if (/^\S+@\S+\.\S+$/.test(form.email.value.trim())) {
    setFieldError(form.email, $('#email-error'), false);
  }
});
