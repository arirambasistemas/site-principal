---
description: "Template de lista de tarefas para implementação orientada por especificações (SDD)"
---

# Tarefas: [NOME DA FUNCIONALIDADE]

**Entrada**: Documentos de design em `/specs/[###-nome-da-feature]/`

**Pré-requisitos**: plan.md (obrigatório com Constitution Check aprovado), spec.md (obrigatório para histórias de usuário), research.md

**Filosofia Test-First (TDD)**: Toda implementação deve ser precedida de testes automatizados com Vitest que inicialmente falhem (Red), seguidos do código mínimo (Green) e refatoração (Refactor), visando cobertura > 90%.

**Organização**: As tarefas são agrupadas por história de usuário para viabilizar entrega incremental e independente de valor comercial.

## Formato: `[ID] [P?] [História] Descrição`

- **[P]**: Pode rodar em paralelo (arquivos distintos, sem dependências mútuas)
- **[História]**: A qual história de usuário a tarefa pertence (ex.: US1, US2, US3)
- Inclua caminhos exatos dos arquivos nas descrições

## Convenções de Caminhos

- **Páginas HTML**: `index.html` ou `landing-pages/[pagina].html`
- **Estilos**: `css/style.css` (fonte com tokens) e `css/style.min.css` (produção)
- **Scripts**: `js/main.js` (fonte) e `js/main.min.js` (produção)
- **Testes**: `tests/unit/` e `tests/integration/`
- **Assets**: `img/` e `fonts/`

---

## Fase 1: Preparação e Infraestrutura

**Objetivo**: Inicialização e ajustes básicos de estrutura/arquivos

- [ ] T001 [P] Criar diretório e arquivos de documentação em `specs/[###-nome-da-feature]/`
- [ ] T002 Verificar dependências, linters e ambiente de testes (`npm test` / Vitest)

---

## Fase 2: Fundacional (Pré-requisitos Bloqueantes)

**Objetivo**: Ajustes estruturais globais que devem estar prontos antes das histórias específicas

- [ ] T003 [P] Atualizar variáveis/tokens de Design System em `css/style.css` se necessário
- [ ] T004 [P] Estruturar utilitários ou contratos de interface em `js/main.js`

**Ponto de Controle**: Base pronta — implementação das histórias de usuário pode iniciar

---

## Fase 3: História de Usuário 1 - [Título] (Prioridade: P1) 🎯 MVP

**Objetivo**: [Breve descrição do valor comercial entregue por esta história]

**Teste Independente**: [Como verificar esta história de forma isolada]

### 1. Testes Automatizados (Test-First / TDD) ⚠️
> **ATENÇÃO: Escreva estes testes PRIMEIRO e confirme que FALHAM antes da implementação**

- [ ] T005 [P] [US1] Criar teste unitário em `tests/unit/test_[componente].test.js` com Vitest
- [ ] T006 [P] [US1] Criar teste de integração/comportamento em `tests/integration/test_[fluxo].test.js`

### 2. Implementação da História de Usuário 1

- [ ] T007 [US1] Adicionar marcação semântica em `index.html` (respeitando WCAG 2.2 AA)
- [ ] T008 [P] [US1] Implementar estilos responsivos consumindo tokens em `css/style.css`
- [ ] T009 [P] [US1] Implementar lógica e microinterações em `js/main.js`
- [ ] T010 [US1] Executar testes Vitest e validar passagem (Green) e cobertura > 90%

**Ponto de Controle**: A História de Usuário 1 deve estar 100% funcional, testada e pronta para entrega.

---

## Fase 4: História de Usuário 2 - [Título] (Prioridade: P2)

**Objetivo**: [Breve descrição do valor comercial entregue]

**Teste Independente**: [Como verificar esta história de forma isolada]

### 1. Testes Automatizados (TDD)
- [ ] T011 [P] [US2] Criar teste de componente/função em `tests/unit/test_[nome].test.js`

### 2. Implementação
- [ ] T012 [US2] Adicionar marcação semântica em `index.html`
- [ ] T013 [P] [US2] Atualizar estilos em `css/style.css`
- [ ] T014 [P] [US2] Atualizar interatividade em `js/main.js`
- [ ] T015 [US2] Executar testes Vitest e validar passagem

---

## Fase 5: Validação Rigorosa, Segurança e Quality Gates (Definition of Done)

**Objetivo**: Garantir conformidade com os 10 Princípios da Constituição v2.0.0

- [ ] T016 [P] Executar auditoria de acessibilidade automatizada com `axe-core` e validar navegação por teclado
- [ ] T017 [P] Executar auditoria de segurança com a ferramenta **Strix** e verificar ausência de vulnerabilidades
- [ ] T018 Executar suíte completa de testes no Vitest e confirmar cobertura > 90%
- [ ] T019 Executar minificação de produção:
  `npx esbuild css/style.css --minify --outfile=css/style.min.css`
  `npx esbuild js/main.js --minify --outfile=js/main.min.js`
- [ ] T020 Validar metas de performance no Lighthouse (Performance $\ge 95$, A11y $100$, SEO $100$)
- [ ] T021 Atualizar dados estruturados Schema.org e arquivos `llms.txt` / `robots.txt` se aplicável
- [ ] T022 Criar commit no padrão Conventional Commits em português (ex.: `feat: adiciona componente de servicos`)
