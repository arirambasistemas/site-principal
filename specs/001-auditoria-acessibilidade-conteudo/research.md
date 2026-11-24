# Pesquisa Técnica: Auditoria de Acessibilidade, Coesão e Redundância

**Feature**: [spec.md](./spec.md) | **Plano**: [plan.md](./plan.md)

## 1. Revisão dos achados preliminares contra o código

Leitura de `css/style.css` e `js/main.js` corrigiu dois achados da spec:

| Achado preliminar | Resultado | Consequência |
| :--- | :--- | :--- |
| Menu móvel fechado pode receber foco | **Não procede**: `.mobile-menu` usa `display:none` quando fechado, então fica fora da ordem de foco e da leitura | RF-004 reduz-se a: gerenciar foco ao abrir e devolver foco ao botão com `Esc` |
| Contraste a verificar | Calculado (WCAG): ver tabela abaixo; todos os pares passam | RF-009 vira verificação de regressão, sem mudança de cor prevista |
| Rolagem ao topo sem respeitar movimento reduzido | Procede: `scrollTo({top:0})` ignora a preferência | Usar `behavior` conforme `prefers-reduced-motion` (ou manter instantâneo, que já respeita) — ver decisão 5 |

### Contraste calculado

| Par (texto/fundo) | Razão | Mínimo | Resultado |
| :--- | :---: | :---: | :--- |
| `--primary` #2c52b0 / branco | 7,14 | 4,5 | Passa |
| `--primary` / `--alt` #f7f9fd | 6,77 | 4,5 | Passa |
| `--primary` / `--soft` #eaf0fb | 6,24 | 4,5 | Passa |
| `--muted` #5a6480 / branco | 5,88 | 4,5 | Passa |
| `--muted` / `--alt` | 5,58 | 4,5 | Passa |
| `--muted` / `--soft` | 5,14 | 4,5 | Passa |
| Selo #dcf08a / #13295c (cartão escuro) | 11,25 | 4,5 | Passa |
| `--lime-d` #5d7a0c / `--lime-soft` | 4,50 | 4,5 | Passa no limite |
| Sucesso #12703a / #e9f8ef | 5,62 | 4,5 | Passa |
| Erro #a62a2a / #fdecec | 6,16 | 4,5 | Passa |
| Borda de erro #d33c3c / branco | 4,69 | 3,0 (componente) | Passa |
| Links de rodapé #dbe3f5 / #13295c | 10,88 | 4,5 | Passa |
| Texto branco / botão primário | 7,14 | 4,5 | Passa |

Pontos de atenção: `--lime-d` está exatamente no limite (4,50); estados `:hover` e `.active` do menu e textos sobre gradientes (`.facts`, `.feat`) serão verificados com axe-core/Lighthouse, pois dependem de fundo variável.

## 2. Decisões

### Decisão 1 — Diálogo de cookies

- **Decisão**: manter o `<div role="dialog">` como diálogo **não modal** (não bloqueia a página). Na abertura automática, não roubar o foco: o aviso fica alcançável pela ordem natural e é identificado por `aria-labelledby`/`aria-describedby`. Quando aberto por ação do usuário (rodapé "Gerenciar cookies"), mover o foco ao título (`tabindex="-1"`). Ao fechar, devolver o foco ao elemento de origem (rodapé) ou deixá-lo onde estava.
- **Justificativa**: roubar foco 1,2 s após carregar interrompe leitura de quem usa leitor de tela; WCAG 2.2 (3.2.1, 2.4.3) pede previsibilidade. A spec (História 1, cenário 1) exige condução do foco e retorno lógico: cumprida com o comportamento acima, que será validado no teste manual.
- **Alternativas**: `<dialog>` modal com `showModal()` (bloqueia a navegação e é agressivo para um aviso de cookies); `role="alertdialog"` (excessivo).
- **Ajuste à spec**: o critério 1 da História 1 fica interpretado como "foco gerenciado conforme o modo de abertura" — registrar em `tasks.md`.

### Decisão 2 — Erros do formulário

- **Decisão**: cada campo ganha um elemento `<p class="field-error" id="{id}-erro" hidden>` com texto; em erro, `aria-invalid="true"`, `aria-describedby` apontando para o texto, mensagem visível (não só borda) e foco no primeiro campo inválido. Resumo no `#formMsg` (`role="status"`, já existente) com contagem de erros. Obrigatoriedade indicada no rótulo com texto "(obrigatório)" e atributo `required` + `aria-required` não duplicado; `novalidate` é mantido para mensagens próprias.
- **Justificativa**: erro por cor viola 1.4.1; padrão nativo + `aria-describedby` dispensa ARIA extra (Princípio VI.4).
- **Alternativas**: validação nativa do navegador (mensagens inconsistentes e fora do design); `aria-errormessage` (suporte irregular).

### Decisão 3 — Menu

- **Decisão**: ao abrir o menu móvel, o foco permanece no botão (padrão disclosure); `Esc` fecha e devolve foco ao botão; clique em link fecha. Sem trap de foco (não é modal).
- **Justificativa**: padrão de disclosure da WAI-ARIA Authoring Practices; o menu está logo após o botão na ordem do DOM.

### Decisão 4 — Remoções de conteúdo

- **Decisão**: remover do HTML a seção `#portfolio`, itens e links de menu/rodapé, a `section.stack-strip`, os itens de e-mail/WhatsApp e `.lead-wa`, e os rótulos flutuantes `.fl` do hero; remover também as regras CSS e o código JS (filtros) correspondentes para não deixar código morto (Princípio III).
- **Rótulos flutuantes**: o `hero-art` é `aria-hidden` e repete a lista de serviços; será mantido apenas como arte decorativa (`orb`/SVG) sem texto, resolvendo ao mesmo tempo o achado de informação em bloco oculto (RF-008).
- **Alternativas**: apenas ocultar com `hidden`/CSS (deixa código morto e links no DOM); manter `.fl` (repetição de conteúdo).

### Decisão 5 — Rolagem e movimento

- **Decisão**: `scrollTo({top:0})` já é instantâneo; manter. Garantir `scroll-behavior:auto` por padrão ou condicionado a `prefers-reduced-motion: no-preference` se algum dia usado. `@media (prefers-reduced-motion: reduce)` já neutraliza `.rv`; estender para animação `bob` dos elementos flutuantes caso permaneçam.
- **Justificativa**: evitar mudança de comportamento sem ganho.

### Decisão 6 — Redação e glossário

- **Decisão**: criar inventário em [data-model.md](./data-model.md) com mensagem-chave → local principal → variações permitidas; reescrever cada seção a partir dele. Termos técnicos (vibe coding, MCP, GEO) recebem uma frase curta de explicação no primeiro uso na página.
- **Alternativas**: reescrever livremente sem inventário (difícil de testar a ausência de repetição).

### Decisão 7 — Estratégia de testes

- **Decisão**: sem `package.json` e sem Vitest (decisão do responsável). Verificação em quatro camadas: (1) `scripts/verificar-conteudo.sh`, com `grep`, cobrindo colchetes, `#portfolio`, `stack-strip`, nomes de serviços, links "Conhecer" e frases repetidas; (2) `npx --yes @axe-core/cli` sob demanda contra o servidor local, para regras estruturais; (3) Lighthouse (Chrome) para contraste e métricas; (4) roteiro manual de teclado e leitor de tela para foco, cookies, menu e formulário.
- **Justificativa**: mantém o repositório estático e sem Node; o script é repetível e roda antes e depois das correções (Test-First possível para o conteúdo).
- **Alternativas**: Vitest + jsdom + axe-core (rejeitado: adiciona `package.json`); Playwright (idem); apenas verificação manual (não repetível).
- **Consequência**: o comportamento do `main.js` (foco, erros, `Esc`) é validado apenas manualmente e a meta de cobertura > 90% não se aplica; registrado como desvio no plano.

### Decisão 8 — Fora do escopo (registrar, não fazer)

- JSON-LD, `canonical`, Open Graph e `llms.txt` na raiz (`index.html` não os possui; dívida já listada na Constituição).
- Política de cookies completa: o rótulo do rodapé passa a "Gerenciar cookies" (descreve a ação real); a política em página própria é feature futura.
- Reintrodução de portfólio, e-mail/WhatsApp reais e páginas dedicadas por serviço.

## 3. Situação das incógnitas

Todas as incógnitas do Contexto Técnico foram resolvidas acima; nenhum `NEEDS CLARIFICATION` permanece.
