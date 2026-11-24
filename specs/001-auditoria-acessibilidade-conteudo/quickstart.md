# Guia de Validação (Quickstart): Auditoria de Acessibilidade, Coesão e Redundância

**Feature**: [spec.md](./spec.md) | **Plano**: [plan.md](./plan.md) | **Contratos**: [ui-contracts.md](./contracts/ui-contracts.md)

## Pré-requisitos

- Node.js 20+ (apenas para `npx`; nada é instalado no repositório).
- Navegador com Lighthouse (Chrome) e um leitor de tela (VoiceOver no macOS ou NVDA).

## 1. Verificação automatizada

```bash
sh scripts/verificar-conteudo.sh
python3 -m http.server 8080 &
npx --yes @axe-core/cli http://localhost:8080/ http://localhost:8080/landing-pages/
```

Resultado esperado: o script termina com sucesso, confirmando ausência de `[`, `Substitua`, `#portfolio`, `stack-strip`, links "Conhecer ..." para `#contato` e nomes de serviços divergentes (CS-003 a CS-005); o axe-core CLI reporta zero violações nas duas páginas (CS-001).

## 2. Build dos assets

```bash
npx esbuild css/style.css --minify --outfile=css/style.min.css
npx esbuild js/main.js --minify --outfile=js/main.min.js
```

Resultado esperado: arquivos minificados regenerados; parâmetros `?v=` dos assets incrementados no HTML.

## 3. Servidor local

Se ainda não estiver rodando (passo 1):

```bash
python3 -m http.server 8080
```

Abrir `http://localhost:8080/` e `http://localhost:8080/landing-pages/`.

## 4. Verificação manual (teclado)

1. Recarregar a página, aguardar o aviso de cookies: o foco não é roubado; `Tab` alcança "Recusar" e "Aceitar"; `Esc` fecha.
2. Rodapé → "Gerenciar cookies": o foco vai ao aviso; ao fechar, volta ao link do rodapé.
3. Largura < 900 px: abrir o menu, `Esc` fecha e devolve o foco ao botão.
4. Enviar o formulário vazio: textos de erro aparecem junto aos campos, foco no campo Nome, resumo anunciado.
5. Preencher corretamente e enviar: mensagem de sucesso anunciada.
6. Confirmar que não há link ou âncora para o portfólio e que a seção de contato só tem o formulário.

## 5. Verificação manual (leitor de tela)

- Percorrer por títulos (`h1` → `h2`), regiões e lista de links: nomes dos links descritivos e únicos.
- Confirmar que o formulário anuncia obrigatoriedade e erros.
- Confirmar que o texto de nenhum bloco `aria-hidden` é informativo.

## 6. Lighthouse

Executar em modo móvel e desktop em `index.html` e `landing-pages/index.html`.

Resultado esperado: Acessibilidade 100; Performance ≥ 95; Boas Práticas ≥ 95; SEO 100 (CS-001).

## 7. Zoom e reflow

Zoom 200% e largura 320 px: sem rolagem horizontal, sem texto cortado em cartões, cabeçalho e formulário.

## 8. Revisão de redação

Comparar o texto da página com [data-model.md](./data-model.md): cada mensagem-chave só no local principal; nenhuma repetição literal (CS-004); termos técnicos explicados.

## Critério de conclusão

Todos os passos acima concluídos sem violações; achados da spec marcados como Verificado com evidência.
