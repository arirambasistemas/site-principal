(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Revelação ao rolar (desligada com prefers-reduced-motion)
  var items = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduce) {
    items.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  // Contadores animados (o valor final já está no HTML)
  var counters = document.querySelectorAll("[data-count]");
  function runCount(el) {
    var end = parseInt(el.getAttribute("data-count"), 10), t0 = null, dur = 1200;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (!reduce && "IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { runCount(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }

  // Eventos de conversão (GA4/GTM quando instalados)
  function track(name, params) {
    if (typeof window.gtag === "function") window.gtag("event", name, params || {});
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(Object.assign({ event: name }, params || {}));
  }
  document.querySelectorAll("[data-track]").forEach(function (el) {
    el.addEventListener("click", function () { track(el.getAttribute("data-track")); });
  });

  // Botões dos planos pré-selecionam o plano no formulário
  var planSelect = document.getElementById("f-plan");
  document.querySelectorAll("[data-plan]").forEach(function (el) {
    el.addEventListener("click", function () {
      if (planSelect) planSelect.value = el.getAttribute("data-plan");
      var name = document.getElementById("f-name");
      if (name) setTimeout(function () { name.focus({ preventScroll: true }); }, 450);
    });
  });

  // Formulário: monta a mensagem e abre o WhatsApp
  var form = document.getElementById("leadForm");
  var msg = document.getElementById("formMsg");
  if (!form) return;
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var f = form.elements;
    if (f.website && f.website.value) return; // honeypot

    var name = f["name"].value.trim();
    f["name"].setAttribute("aria-invalid", name ? "false" : "true");
    if (!name) { msg.textContent = "Informe seu nome para continuar."; f["name"].focus(); return; }

    var number = (form.getAttribute("data-wa") || "").replace(/\D/g, "");
    if (number.length < 12) { msg.textContent = "WhatsApp em configuração. Tente novamente em breve."; return; }

    var lines = [
      "Olá! Quero uma landing page com a Ariramba.",
      "Nome: " + name,
      f.biz.value.trim() ? "Empresa/segmento: " + f.biz.value.trim() : "",
      "Plano de interesse: " + f.plan.value,
      f.msg.value.trim() ? "Objetivo: " + f.msg.value.trim() : ""
    ].filter(Boolean).join("\n");

    track("generate_lead", { method: "whatsapp", plan: f.plan.value });
    msg.textContent = "Abrindo o WhatsApp...";
    window.open("https://wa.me/" + number + "?text=" + encodeURIComponent(lines), "_blank", "noopener");
  });
})();
