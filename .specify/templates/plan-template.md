# Plano de Implementação: [NOME DA FUNCIONALIDADE]

**Branch**: `[###-nome-da-feature]` | **Data**: [DATA] | **Especificação**: [link para spec.md]

**Entrada**: Especificação da feature em `/specs/[###-nome-da-feature]/spec.md`

**Nota**: Este template é preenchido pelo comando `/speckit-plan`; sua definição descreve o fluxo de execução técnica em conformidade com a Constituição v2.0.0.

## Resumo

[Resumo da especificação: requisito primário, valor institucional/comercial e abordagem técnica selecionada após análise]

## Contexto Técnico & Arquitetural

**Linguagens & Versões**: HTML5, CSS3 moderno, JavaScript ES6+ (ou TypeScript quando aplicável)

**Ferramentas de Build**: `esbuild` (minificação mandatória de `css/style.css` e `js/main.js`)

**Estrutura & Containerização**: Static Site / Docker e Docker Compose (se aplicável a serviços de suporte)

**Framework de Testes**: Vitest (testes unitários/integração JS) e/ou Pytest (Python)

**Acessibilidade & Responsividade**: WCAG 2.2 nível AA, axe-core, navegação por teclado, Mobile-First

**Metas de Performance & Core Web Vitals**:
- Lighthouse: Performance $\ge 95$, Acessibilidade $100$, Boas Práticas $\ge 95$, SEO $100$
- LCP $\le 2,5\text{ s}$ | INP $\le 200\text{ ms}$ | CLS $\le 0,1$

**Controles de Segurança**: Validação via Strix, headers de segurança/CSP, sanitização de inputs, sem exposição de credenciais

**SEO & GEO**: Metadados semânticos, JSON-LD Schema.org, atualização de `robots.txt` e `llms.txt`

## Verificação da Constituição (Constitution Check)

*Portão de Qualidade Obrigatório: Todos os itens abaixo DEVEM ser avaliados antes da fase de detalhamento e validados antes da geração de tarefas.*

- [ ] **I. Propósito Comercial/Institucional**: A funcionalidade possui justificativa comercial ou institucional clara sem introduzir bloat?
- [ ] **II. Arquitetura Modular & Simplicidade**: Respeita separação de responsabilidades, componentes reutilizáveis e evita complexidade prematura?
- [ ] **III. Engenharia Rigorosa & Linters**: Cumpre Clean Code, SOLID, regras de lint e ausência de código morto?
- [ ] **IV. Design System & Tokens**: Consome exclusivamente as variáveis e tokens oficiais sem estilos arbitrários soltos?
- [ ] **V. UX & Conversão**: Interface orientada à conversão, mobile-first, com microinterações acessíveis e sem dark patterns?
- [ ] **VI. Acessibilidade (WCAG 2.2 AA)**: Utiliza HTML semântico nativo, compatibilidade com leitores de tela e axe-core planejado?
- [ ] **VII. Security by Design & Strix**: Sanitização de dados, cabeçalhos de segurança e validação com ferramenta Strix planejada?
- [ ] **VIII. Performance, SEO & GEO**: Otimização de assets, minificação com esbuild, dados Schema.org e alinhamento com llms.txt?
- [ ] **IX. Test-First (TDD > 90%)**: Estratégia de testes definida com Vitest antes da implementação e meta de cobertura > 90%?
- [ ] **X. Spec-Driven & Idioma PT-BR**: Artefatos, documentação e commits padronizados estritamente em Português do Brasil?

## Estrutura do Projeto & Arquivos Afetados

### Documentação (Desta Feature)

```text
specs/[###-nome-da-feature]/
├── spec.md              # Especificação de requisitos (/speckit-specify)
├── plan.md              # Este plano de implementação (/speckit-plan)
├── research.md          # Pesquisa técnica e alternativas (/speckit-plan)
├── data-model.md        # Modelos ou estrutura de dados (se aplicável)
├── quickstart.md        # Guia rápido de teste/validação
└── tasks.md             # Tarefas de implementação (/speckit-tasks)
```

### Código-Fonte Afetado (Raiz do Repositório)

```text
index.html               # Página principal (ou landing-pages/[pagina].html)
css/
├── style.css            # Folha de estilo fonte (consome design tokens)
└── style.min.css        # Folha de estilo de produção (gerada via esbuild)
js/
├── main.js              # Script JavaScript fonte
└── main.min.js          # Script de produção (gerado via esbuild)
tests/                   # Baterias de testes Vitest (unit/integration)
img/                     # Assets de imagens (WebP, SVG)
fonts/                   # Fontes locais
```

**Decisão de Estrutura**: [Descrever os arquivos que serão criados ou modificados e a justificativa arquitetural]

## Registro de Complexidade & Desvios Constitucionais

> **Preencher APENAS se houver exceções ou desvios em relação à Constituição do Projeto**

| Violação / Desvio | Motivo da Necessidade | Alternativa Mais Simples Rejeitada Por Quê | Aprovação Humana |
| :--- | :--- | :--- | :--- |
| [ex.: Biblioteca externa para gráfico interativo] | [ex.: Requisito comercial de demonstração interativa] | [ex.: Implementação manual com Canvas levaria tempo excessivo] | [Data e Responsável] |
