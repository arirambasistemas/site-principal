# Tarefas: Auditoria de Acessibilidade, Coesão e Redundância de Conteúdo

**Entrada**: Documentos de design em `/specs/001-auditoria-acessibilidade-conteudo/`  
**Pré-requisitos**: [plan.md](./plan.md) (com Constitution Check e desvio do Princípio IX aprovado pelo responsável), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/ui-contracts.md](./contracts/ui-contracts.md), [quickstart.md](./quickstart.md)  
**Estratégia de Verificação**: Sem `package.json` nem dependências instaladas no repositório. O script `scripts/verificar-conteudo.sh` é escrito primeiro para falhar (Red), orientando as correções até passar (Green). Acessibilidade é validada via `npx @axe-core/cli` e roteiro manual de teclado/leitor de tela.

## Formato: `[ID] [P?] [História] Descrição com caminho de arquivo`

- **[P]**: Pode rodar em paralelo (arquivos distintos, sem dependências mútuas)
- **[História]**: A qual história de usuário a tarefa pertence ([US1], [US2], [US3])
- Sem rótulo de história para Setup, Foundational e Polish

---

## Fase 1: Preparação e Infraestrutura

**Objetivo**: Criar a ferramenta de verificação automatizada de conteúdo antes das alterações no código (Test-First).

- [X] T001 Criar o script de verificação automatizada `scripts/verificar-conteudo.sh` cobrindo colchetes, links `#portfolio`, seção `stack-strip`, nomes divergentes de serviços, links "Conhecer" genéricos e mensagens duplicadas
- [X] T002 Tornar executável e rodar `scripts/verificar-conteudo.sh` para confirmar que falha contra o estado atual do repositório (Red)

---

## Fase 2: Fundacional (Pré-requisitos Bloqueantes)

**Objetivo**: Definir estilos base de acessibilidade e estados no CSS antes de implementar as histórias.

- [X] T003 [P] Adicionar tokens de estado de erro/sucesso e estilos para mensagens de erro `.field-error` e indicadores obrigatórios em `css/style.css`
- [X] T004 [P] Estruturar funções auxiliares de anúncio de erro e foco visível em `js/main.js`

**Ponto de Controle**: Base pronta — implementação das histórias de usuário pode iniciar.

---

## Fase 3: História de Usuário 1 - Navegar e contatar a empresa sem barreiras de acessibilidade (Prioridade: P1) 🎯 MVP

**Objetivo**: Permitir navegação por teclado e tecnologias assistivas sem barreiras: formulário com erros em texto associados por ARIA, aviso de cookies sem roubar foco, menu móvel com fechamento por Esc e semântica correta.

**Teste Independente**: Navegar com teclado (Tab/Shift+Tab/Esc), submeter formulário inválido e verificar foco/mensagens em texto; executar `npx --yes @axe-core/cli` com zero violações.

### Implementação da História de Usuário 1

- [X] T005 [P] [US1] Ajustar marcação semântica em `index.html`: trocar `<ol class="signs">` por `<ul>`, indicar campos obrigatórios nos `<label>`, adicionar contêineres `.field-error` com IDs para `aria-describedby` e adicionar `type="button"` ao botão `#toTop`
- [X] T006 [P] [US1] Ajustar regras de estilo em `css/style.css` para mensagens de erro em texto e garantir foco visível nítido com `:focus-visible` em todos os elementos interativos
- [X] T007 [US1] Ajustar o diálogo de cookies em `js/main.js` para não roubar o foco na abertura automática e manter navegação natural por teclado
- [X] T008 [US1] Implementar validação acessível no formulário em `js/main.js`: aplicar `aria-invalid="true"`, associar `aria-describedby` ao texto de erro, exibir mensagem descritiva em texto, mover o foco ao primeiro campo com erro e anunciar status em `#formMsg`
- [X] T009 [US1] Implementar fechamento do menu móvel com a tecla `Esc` devolvendo o foco ao botão `#burger` em `js/main.js`

**Ponto de Controle**: Acessibilidade e fluxo de contato utilizáveis por teclado e leitor de tela (MVP concluído).

---

## Fase 4: História de Usuário 2 - Entender a oferta sem repetição e chegar ao destino certo (Prioridade: P2)

**Objetivo**: Eliminar repetições de mensagens de IA e tecnologia, padronizar nomes oficiais dos cinco serviços e garantir que links levem ao destino anunciado.

**Teste Independente**: Executar checagens de texto via `scripts/verificar-conteudo.sh` confirmando ausência de mensagens duplicadas e nomes de serviços consistentes.

### Implementação da História de Usuário 2

- [X] T010 [P] [US2] Centralizar a mensagem completa sobre uso de IA no hero (`index.html`) e remover repetições literais em Sobre, Tecnologias, chip "IA nos processos" e indicador "Apoio de IA em cada entrega"
- [X] T011 [P] [US2] Padronizar os nomes oficiais dos cinco serviços em `index.html` (Landing Pages, Aplicativos Mobile, Sistemas Web, Segurança em Vibe Coding, Consultoria em IA) em menu, hero, cartões, formulário e rodapé
- [X] T012 [P] [US2] Atualizar links dos cartões de serviços em `index.html`: apontar Landing Pages para `/landing-pages/` e alterar demais cartões para "Solicitar orçamento de [serviço]" rolando para `#contato`
- [X] T013 [P] [US2] Remover a seção `.stack-strip`, as etiquetas redundantes dos cartões de serviço e os rótulos flutuantes `.fl` do hero em `index.html`
- [X] T014 [P] [US2] Limpar regras CSS órfãs da `.stack-strip` e `.fl` em `css/style.css`

**Ponto de Controle**: Conteúdo coeso, nomes de serviços padronizados e links transparentes.

---

## Fase 5: História de Usuário 3 - Ver apenas conteúdo final e verdadeiro (Prioridade: P3)

**Objetivo**: Remover conteúdo provisório e seções incompletas (portfólio e canais de contato diretos não configurados), deixando o formulário como canal único e atualizando termos de cookies.

**Teste Independente**: Executar `scripts/verificar-conteudo.sh` confirmando zero ocorrências de `[`, `Substitua`, `#portfolio` e links `mailto:`/`whatsapp` provisórios.

### Implementação da História de Usuário 3

- [X] T015 [P] [US3] Remover a seção `#portfolio` completa e os links para `#portfolio` do menu principal, menu móvel e rodapé em `index.html`
- [X] T016 [P] [US3] Remover os blocos de e-mail e WhatsApp em `#contato` e o link `.lead-wa` em `index.html`, mantendo o formulário como canal único; renomear botão do rodapé para "Gerenciar cookies"
- [X] T017 [P] [US3] Remover estilos CSS órfãos do portfólio (`.filters`, `.pf*`, `.contact-list`) em `css/style.css`
- [X] T018 [P] [US3] Remover lógica de filtro do portfólio em `js/main.js` e atualizar ação do botão "Gerenciar cookies" para mover foco ao diálogo e devolvê-lo ao fechar
- [X] T019 [US3] Aplicar diretrizes equivalentes de acessibilidade, honeypot oculto a leitores de tela e termos padronizados em `landing-pages/index.html`

**Ponto de Controle**: Site limpo de qualquer marcador provisório ou canal inoperante.

---

## Fase 6: Validação Rigorosa, Build e Quality Gates (Definition of Done)

**Objetivo**: Minificar assets de produção, validar zero violações de acessibilidade no axe-core e testar fluxos manuais de ponta a ponta.

- [X] T020 Executar `sh scripts/verificar-conteudo.sh` e confirmar passagem de 100% dos testes de conteúdo (Green)
- [X] T021 Executar `npx --yes @axe-core/cli` contra `index.html` e `landing-pages/index.html` via servidor local e comprovar zero violações
- [X] T022 Regenerar arquivos minificados de produção:
  `npx esbuild css/style.css --minify --outfile=css/style.min.css`
  `npx esbuild js/main.js --minify --outfile=js/main.min.js`
- [X] T023 Atualizar versões de cache `?v=` nos links de CSS e JS em `index.html` e atualizar `README.md` com instruções de verificação e build
- [X] T024 Executar validação manual de teclado e leitor de tela seguindo o roteiro de [quickstart.md](./quickstart.md)
- [X] T025 Criar commit das alterações no padrão Conventional Commits em português (ex.: `fix: acessibilidade no formulario e unificacao de conteudo`)

---

## Dependências e Sequenciamento de Histórias

```mermaid
graph TD
  F1[Fase 1: Script de Verificação] --> F2[Fase 2: Fundacional CSS/JS]
  F2 --> US1[Fase 3: US1 - Acessibilidade & Formulário (MVP)]
  US1 --> US2[Fase 4: US2 - Coesão & Redundâncias]
  US2 --> US3[Fase 5: US3 - Remoção de Portfólio & Provisórios]
  US3 --> F6[Fase 6: Build, Axe-core & Quality Gates]
```

## Oportunidades de Execução Paralela

- **Fase 2**: T003 (`css/style.css`) e T004 (`js/main.js`) podem ser executados em paralelo.
- **Fase 3 (US1)**: T005 (`index.html`) e T006 (`css/style.css`) podem ser executados em paralelo.
- **Fase 4 (US2)**: T010, T011, T012, T013 (`index.html`) e T014 (`css/style.css`) podem ser executados com edições agrupadas.
- **Fase 5 (US3)**: T015/T016 (`index.html`), T017 (`css/style.css`) e T018 (`js/main.js`) alteram arquivos distintos.

## Estratégia de Implementação

1. **Abordagem Incremental**: Começar pelo MVP (História de Usuário 1) garantindo que o formulário e a navegação estejam 100% acessíveis e sem barreiras de teclado/leitores de tela.
2. **Redução e Limpeza**: Em seguida, aplicar US2 e US3 para eliminar ruído, duplicidade e códigos/seções incompletas.
3. **Build Leve**: Finalizar gerando os arquivos `.min` via esbuild e executando axe-core e o script de conteúdo para garantir regressão zero.
