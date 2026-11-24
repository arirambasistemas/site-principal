#!/bin/sh
# scripts/verificar-conteudo.sh
# Valida conformidade de conteúdo, ausência de provisórios e coesão textual

ERROS=0

log_fail() {
  echo "❌ [FALHA] $1"
  ERROS=$((ERROS + 1))
}

log_pass() {
  echo "✅ [PASSOU] $1"
}

echo "=== Iniciando Verificação de Conteúdo ==="

# 1. Checagem de colchetes e marcadores provisórios em index.html (fora de tags <script>)
if grep -v '<script' index.html | grep -E '\[|\]' >/dev/null 2>&1; then
  log_fail "index.html contém colchetes provisórios [...] no conteúdo"
else
  log_pass "Nenhum colchete provisório no conteúdo de index.html"
fi

if grep -i "Substitua" index.html >/dev/null 2>&1; then
  log_fail "index.html contém a palavra 'Substitua'"
else
  log_pass "Nenhuma ocorrência de 'Substitua' em index.html"
fi

# 2. Checagem de seção e âncoras para portfólio
if grep -E 'id="portfolio"|href="#portfolio"' index.html >/dev/null 2>&1; then
  log_fail "index.html contém referências à seção #portfolio"
else
  log_pass "Nenhuma referência à seção #portfolio em index.html"
fi

# 3. Checagem de stack-strip (tira de tecnologias redundante)
if grep -E 'class="stack-strip"' index.html >/dev/null 2>&1; then
  log_fail "index.html ainda contém a seção .stack-strip redundante"
else
  log_pass "Seção .stack-strip removida de index.html"
fi

# 4. Checagem de canais de contato provisórios e links inválidos
if grep -E 'mailto:\[|\[e-mail|\[número|class="lead-wa"' index.html >/dev/null 2>&1; then
  log_fail "index.html contém canais de contato provisórios ou link lead-wa"
else
  log_pass "Sem contatos provisórios ou link lead-wa em index.html"
fi

# 5. Checagem do botão de cookies no rodapé
if grep -E 'id="cookiePrefs">Política de cookies</button>' index.html >/dev/null 2>&1; then
  log_fail "Botão do rodapé ainda está rotulado como 'Política de cookies' em vez de 'Gerenciar cookies'"
else
  log_pass "Botão do rodapé rotulado como 'Gerenciar cookies'"
fi

# 6. Checagem de links 'Conhecer ...' apontando para #contato
if grep -E 'href="#contato">Conhecer' index.html >/dev/null 2>&1; then
  log_fail "Existem links com texto 'Conhecer ...' apontando apenas para #contato"
else
  log_pass "Nenhum link 'Conhecer ...' apontando incorretamente para #contato"
fi

# 7. Checagem de repetição literal da frase de IA fora do hero
# A frase "usamos IA em nossos processos para entregar com mais qualidade, desempenho e rapidez"
# deve estar apenas no hero (seção #inicio)
FRASES_IA=$(grep -c "usamos IA em nossos processos para entregar com mais qualidade, desempenho e rapidez" index.html || true)
if [ "$FRASES_IA" -gt 1 ]; then
  log_fail "Frase sobre uso de IA nos processos repetida $FRASES_IA vezes em index.html (deve ser única no hero)"
else
  log_pass "Mensagem sobre IA nos processos concentrada sem repetição literal ($FRASES_IA ocorrência)"
fi

# 8. Checagem de nomes de serviços divergentes
# Proibido: "Aplicativos" solto (deve ser "Aplicativos Mobile"), "Sistemas" solto (deve ser "Sistemas Web"), "Consultoria IA" sem "em"
if grep -E '<span class="badge">Aplicativos</span>|<span class="badge">Sistemas</span>|Consultoria IA' index.html >/dev/null 2>&1; then
  log_fail "Nomes de serviços divergentes encontrados (ex.: Aplicativos ou Sistemas sem qualificador, ou Consultoria IA sem 'em')"
else
  log_pass "Nomes de serviços padronizados de acordo com as diretrizes oficiais"
fi

# 9. Checagem de semântica em index.html: <ol class="signs"> deve ser <ul>
if grep -E '<ol class="signs"' index.html >/dev/null 2>&1; then
  log_fail "Lista de sinais ainda usa <ol> em vez de <ul>"
else
  log_pass "Lista de sinais usa semântica <ul> apropriada"
fi

# 10. Checagem de type="button" no toTop
if grep -E 'id="toTop"' index.html | grep -v 'type="button"' >/dev/null 2>&1; then
  log_fail "Botão #toTop está sem type=\"button\""
else
  log_pass "Botão #toTop possui type=\"button\""
fi

echo "========================================="
if [ $ERROS -gt 0 ]; then
  echo "Resultado: ❌ $ERROS erro(s) encontrado(s)."
  exit 1
else
  echo "Resultado: ✅ Todas as verificações de conteúdo passaram com sucesso!"
  exit 0
fi
