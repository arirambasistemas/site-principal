# Plano de Implementação: Auditoria de Acessibilidade, Coesão e Redundância de Conteúdo

**Branch**: `001-auditoria-acessibilidade-conteudo` | **Data**: 2026-11-24 | **Especificação**: [spec.md](./spec.md)

**Entrada**: Especificação da feature em `/specs/001-auditoria-acessibilidade-conteudo/spec.md`

## Resumo

Corrigir `index.html`, `css/style.css` e `js/main.js` (e `landing-pages/index.html`) para atender WCAG 2.2 AA, eliminar textos repetidos, unificar nomes de serviços e remover conteúdo provisório. Decisões da clarificação: portfólio removido da página, contatos de e-mail/WhatsApp removidos (formulário como único canal), mensagem sobre IA concentrada no hero, links de serviço honestos, nomes oficiais dos cinco serviços e remoção da tira de tecnologias.

Abordagem técnica: edição direta de HTML/CSS/JS puros, sem `package.json` nem dependências no repositório. Os arquivos minificados são regenerados com `npx esbuild` (como no README). A verificação usa um script de shell com buscas de conteúdo (`scripts/verificar-conteudo.sh`), `npx @axe-core/cli` e Lighthouse executados sob demanda, mais auditoria manual (teclado, leitor de tela). Detalhes em [research.md](./research.md).

## Contexto Técnico & Arquitetural

**Linguagens & Versões**: HTML5, CSS3, JavaScript ES2020 (sem TypeScript)

**Ferramentas de Build**: `esbuild` via `npx` (já documentado no README); nenhum `package.json` é criado

**Estrutura & Containerização**: Site estático publicado no GitHub Pages (`.github/workflows/deploy.yml`); Docker não se aplica a esta feature

**Framework de Testes**: Sem framework de testes JS. Verificação por `scripts/verificar-conteudo.sh` (shell + `grep`), `npx @axe-core/cli` e Lighthouse sob demanda, e roteiro manual (ver Registro de Complexidade)

**Acessibilidade & Responsividade**: WCAG 2.2 AA, axe-core, navegação por teclado, reflow a 320 px, movimento reduzido

**Metas de Performance & Core Web Vitals**:
- Lighthouse: Performance ≥ 95, Acessibilidade 100, Boas Práticas ≥ 95, SEO 100
- LCP ≤ 2,5 s | INP ≤ 200 ms | CLS ≤ 0,1 (nenhuma regressão; a remoção de seções reduz peso)

**Controles de Segurança**: Pixel continua carregado só após consentimento; nenhum script de terceiros novo; mensagens de erro sem eco de dados

**SEO & GEO**: Nomes de serviços e títulos acompanham a mudança; `llms.txt` e `sitemap.xml` ficam como estão (fora do escopo, dívida técnica já registrada na Constituição)

**Restrições conhecidas**: sem backend (formulário valida no cliente); portfólio, contatos reais e páginas por serviço virão em features futuras

**Itens sem decisão pendente**: nenhum `NEEDS CLARIFICATION` restante após [research.md](./research.md)

## Verificação da Constituição (Constitution Check)

*Avaliação inicial (antes da Fase 0) e reavaliação após o design (Fase 1).*

- [x] **I. Propósito Comercial/Institucional**: Aumenta conversão removendo barreiras e dúvidas; remove em vez de adicionar conteúdo.
- [x] **II. Arquitetura Modular & Simplicidade**: Mudanças localizadas por seção/componente; sem frameworks.
- [x] **III. Engenharia Rigorosa & Linters**: Remove código morto (CSS/JS do portfólio e da tira); lint não existe no repositório (dívida da Constituição, fora do escopo).
- [x] **IV. Design System & Tokens**: Novos estilos (mensagem de erro, indicador obrigatório) usam tokens existentes (`--primary`, `--muted`); cores de erro/sucesso promovidas a tokens.
- [x] **V. UX & Conversão**: Formulário como canal único com erros claros; chamadas para ação específicas; sem dark patterns.
- [x] **VI. Acessibilidade (WCAG 2.2 AA)**: Núcleo da feature; axe-core, Lighthouse e teste manual planejados.
- [x] **VII. Security by Design & Strix**: Sem novas superfícies; validação Strix fica para pipeline futura (dívida existente).
- [x] **VIII. Performance, SEO & GEO**: Minificação regenerada; redução de peso; nomes de serviço coerentes com metadados.
- [ ] **IX. Test-First (TDD > 90%)**: Vitest não é adotado (decisão do responsável: site HTML puro não usa `package.json`). A verificação é escrita antes da correção (script de conteúdo falhando primeiro) e complementada por axe-core CLI, Lighthouse e roteiro manual. Desvio registrado abaixo; a meta de cobertura > 90% não é mensurável sem framework e fica fora desta feature.
- [x] **X. Spec-Driven & Idioma PT-BR**: Artefatos, textos e commits em pt-BR.

**Resultado do portão**: aprovado com um desvio registrado (Princípio IX), já alinhado com o responsável: sem `package.json` e sem Vitest.

## Estrutura do Projeto & Arquivos Afetados

### Documentação (Desta Feature)

```text
specs/001-auditoria-acessibilidade-conteudo/
├── spec.md              # Especificação (/speckit-specify + /speckit-clarify)
├── plan.md              # Este plano
├── research.md          # Decisões técnicas e auditoria de contraste/foco
├── data-model.md        # Glossário de mensagens, serviços e inventário de conteúdo
├── quickstart.md        # Como validar a feature
├── contracts/
│   └── ui-contracts.md  # Contratos de UI: cookies, formulário, menu, links
└── tasks.md             # (/speckit-tasks)
```

### Código-Fonte Afetado (Raiz do Repositório)

```text
index.html               # Edição: remover portfólio, tira de tecnologias, contatos; reescrever textos; ARIA/semântica
css/
├── style.css            # Edição: remover regras mortas; estilos de erro/obrigatório; foco; movimento reduzido
└── style.min.css        # Regenerado (esbuild)
js/
├── main.js              # Edição: cookies, erros acessíveis, Esc no menu, remover filtros
└── main.min.js          # Regenerado (esbuild)
landing-pages/index.html # Edição: mesmas diretrizes (RF-020)
scripts/
└── verificar-conteudo.sh # Novo: checagens de conteúdo (colchetes, portfólio, nomes de serviços, links, frases repetidas)
README.md                # Atualizado com o roteiro de verificação
```

**Decisão de Estrutura**: manter site estático sem Node no repositório. O único arquivo novo de verificação é um script de shell que não entra no deploy (o workflow copia arquivos explícitos para `_site`). O arquivo `.github/workflows/deploy.yml` não é alterado nesta feature.

## Fases de Implementação (ordem sugerida)

1. **Verificação primeiro (vermelho)**: criar `scripts/verificar-conteudo.sh` (sem colchetes, sem `#portfolio`, sem `stack-strip`, nomes de serviços, links "Conhecer", frase repetida) e executá-lo para ver falhar.
2. **Conteúdo e estrutura** em `index.html`: remoções (portfólio, tira, contatos, rótulos flutuantes), reescrita de textos (hero como local principal da IA), nomes oficiais, links, semântica (`ul` nos sinais), títulos.
3. **JS**: foco do aviso de cookies, erros do formulário (`aria-invalid`, `aria-describedby`, foco no primeiro erro), `Esc` devolvendo foco ao botão, remoção do código de filtros.
4. **CSS**: limpar regras do portfólio, tira e `.fl`; estilos de erro com texto; indicador de obrigatório; foco; tokens.
5. **Landing page** (`landing-pages/index.html`): aplicar RF-020.
6. **Build e verificação**: `esbuild`, incrementar `?v=` dos assets, rodar testes, Lighthouse e verificação manual conforme [quickstart.md](./quickstart.md).

## Registro de Complexidade & Desvios Constitucionais

| Violação / Desvio | Motivo da Necessidade | Alternativa Mais Simples Rejeitada Por Quê | Aprovação Humana |
| :--- | :--- | :--- | :--- |
| Não adotar Vitest/`package.json` (Princípio IX pede Test-First com Vitest e cobertura > 90%) | Decisão do responsável: páginas HTML puras não precisam de `package.json`; manter o repositório sem Node | Criar ambiente Vitest + jsdom + axe-core: rejeitado por adicionar tooling ao site estático | Aprovado pelo responsável em 2026-11-24 |
