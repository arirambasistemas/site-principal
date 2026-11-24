<!--
Sync Impact Report:
- Version change: 1.0.0 → 2.0.0 (MAJOR: Redefinição e expansão integral dos princípios fundamentais e governança formal)
- List of modified principles:
  - Princípio I: Propósito institucional e comercial (Redefinido)
  - Princípio II: Arquitetura modular, reutilizável e observável (Adicionado: Docker, OTEL, Prometheus)
  - Princípio III: Engenharia de software rigorosa (Adicionado: Clean Code, SOLID, Linters, CI/CD)
  - Princípio IV: Design System como fonte única da verdade (Adicionado: Tokens e Componentes)
  - Princípio V: Experiência interativa orientada à conversão (Adicionado: UX, microinterações, mobile-first)
  - Princípio VI: Acessibilidade por concepção / Accessibility First (Expandido: WCAG 2.2 AA, axe-core, leitores de tela)
  - Princípio VII: Security by Design e DevSecOps (Adicionado: OWASP, LGPD, Strix, CSP, DevSecOps)
  - Princípio VIII: Performance First, SEO, GEO e descoberta por IA (Expandido: Core Web Vitals, Schema.org, llms.txt, GEO/AEO)
  - Princípio IX: Test-First, Quality Gates e cobertura superior a 90% (Adicionado: TDD, Vitest/Pytest, coverage > 90%, Quality Gates)
  - Princípio X: Spec-Driven Development e governança de agentes (Adicionado: SDD, rastreabilidade, PT-BR, ADRs, governança de agentes)
- Added sections:
  - Requisitos Transversais
  - Definition of Done (DoD)
  - Governança Constitucional & Resolução de Conflitos
  - Diagnóstico de Conformidade e Lacunas Atuais da Base de Código
- Removed sections: N/A
- Templates requiring updates:
  - .specify/templates/spec-template.md: ✅ Sincronizado com os requisitos transversais e critérios de aceitação
  - .specify/templates/plan-template.md: ✅ Sincronizado com os 10 portões da Verificação Constitucional
  - .specify/templates/tasks-template.md: ✅ Sincronizado com o fluxo Test-First, Vitest, Strix e DoD
  - .specify/templates/checklist-template.md: ✅ Sincronizado com a checklist do Definition of Done
- Follow-up TODOs:
  - Criar especificações e tarefas para suprir as lacunas atuais: inicialização de package.json com scripts de lint/test (Vitest), configuração do Strix, Dockerfile e automação de Quality Gates no GitHub Actions.
-->

# Constituição — Ariramba Sistemas

**Projeto**: Ariramba Sistemas  
**Domínio Oficial**: arirambasistemas.com.br  
**Idioma Oficial**: Português do Brasil (pt-BR)  
**Metodologia**: Spec-Driven Development (SDD) via GitHub Spec Kit  
**Versão**: 2.0.0 | **Ratificada**: 2026-11-24 | **Última Alteração**: 2026-11-24  
**Autoridade de Aprovação**: Responsável Humano pelo Projeto  

---

## Preâmbulo

Esta Constituição estabelece os princípios supremos, convenções técnicas, padrões de engenharia e regras de governança para o desenvolvimento, manutenção e evolução de software na **Ariramba Sistemas**. Suas determinações são de observância obrigatória para todos os desenvolvedores humanos e agentes de inteligência artificial que atuam no repositório.

---

## Princípios Fundamentais

### I — Propósito Institucional e Comercial

A plataforma Ariramba Sistemas DEVE operar como ambiente institucional e comercial de excelência, projetada para apresentar a empresa, demonstrar serviços, transmitir credibilidade técnica e converter visitantes em clientes potenciais.

São requisitos mandatórios:
1. **Comunicação Eficaz**: Comunicar os serviços de maneira clara, objetiva, acessível e humanizada.
2. **Orientação Comercial**: Priorizar a geração contínua de oportunidades e leads comerciais qualificados.
3. **Público-Alvo Abrangente**: Atender pessoas físicas, profissionais liberais e empresas de diferentes portes.
4. **Modularidade Comercial**: Apresentar serviços independentes contratáveis individualmente ou em pacotes integrados.
5. **Demonstração Prática**: Demonstrar soluções e competências técnicas por meio de experiências interativas e funcionais.
6. **Escalabilidade da Plataforma**: Preservar a capacidade de expansão arquitetural e de conteúdo sem retrabalho estrutural.
7. **Foco em Resultados**: Priorizar valor concreto e retorno perceptível para o usuário e o negócio.
8. **Rejeição de Bloat**: Rejeitar categoricamente funcionalidades, scripts ou elementos visuais sem propósito institucional, comercial ou funcional comprovado.
9. **Simplicidade Inicial**: Evitar qualquer complexidade arquitetural prematura ou superengenharia.

*Toda e qualquer funcionalidade DEVE apresentar justificativa explícita alinhada a este propósito comercial e institucional.*

---

### II — Arquitetura Modular, Reutilizável e Observável

A arquitetura do projeto DEVE ser orientada por modularidade estrita, alta coesão, baixo acoplamento e separação transparente de responsabilidades.

#### 1. Diretrizes Arquiteturais
- **Organização**: Organizar o código por domínios funcionais e responsabilidades claras.
- **Componentização**: Desenvolver componentes autônomos, parametrizáveis e reutilizáveis.
- **Separação de Camadas**: Separar apresentação (HTML/CSS), comportamento (JS), regras de negócio e persistência de dados.
- **Centralização**: Centralizar configurações compartilhadas, constantes e design tokens.
- **Integridade de Dependências**: Proibir dependências circulares e duplicações de código (DRY).
- **Compatibilidade**: Preservar a compatibilidade com a stack tecnológica existente (HTML5, Vanilla CSS, Vanilla JS, minificação via `esbuild`).
- **Decisões Estruturais (ADR)**: Registrar e justificar decisões arquiteturais relevantes por meio de Architecture Decision Records (ADRs).
- **Parcimônia de Distribuição**: NÃO introduzir microsserviços, workers distribuídos ou arquiteturas complexas sem necessidade técnica justificada e aprovada.

#### 2. Containerização
- **Padrão Docker**: Adotar Docker como padrão oficial de empacotamento e containerização em ambientes onde serviços de backend ou pipelines forem introduzidos.
- **Docker Compose**: Utilizar Docker Compose para orquestração de desenvolvimento local e serviços de suporte quando aplicável.
- **Reprodutibilidade**: Garantir ambientes isolados, auditáveis e reproduzíveis documentados em código.
- **Imagens Seguras**: Utilizar imagens base confiáveis, mínimas (distroless ou alpine) e estritamente versionadas por digest/tag imutável.
- **Configurações por Ambiente**: Separar ambientes de desenvolvimento, teste e produção por variáveis de ambiente via `.env.example`.
- **Segurança de Execução**: Não executar containers como usuário `root`. Implementar `healthcheck` ativo em todos os serviços conteinerizados.

#### 3. Observabilidade
Adotar OpenTelemetry (OTEL) como padrão oficial de instrumentação e Prometheus para coleta e monitoramento de métricas operacionais quando houver serviços ativos.
- **Pilares Obrigatórios**: Monitorar métricas de aplicação, métricas de runtime, logs estruturados em JSON e rastreamento distribuído (traces).
- **Monitoramento Contínuo**: Acompanhar disponibilidade, latência (p50, p95, p99), taxa de erros (HTTP 4xx/5xx) e consumo de recursos.
- **Privacidade em Telemetria**: Proibir estritamente o envio de dados pessoais (LGPD), senhas, tokens ou dados sensíveis em logs, métricas ou traces.
- **Proporcionalidade**: A instrumentação DEVE ser proporcional à complexidade da aplicação, sem inflar custos de infraestrutura em páginas puramente estáticas.

---

### III — Engenharia de Software Rigorosa

Todo código produzido por desenvolvedores humanos ou agentes de IA DEVE cumprir rigorosamente os mais altos padrões de qualidade da indústria.

#### 1. Princípios de Engenharia
- **Clean Code**: Código autoexplicativo, nomes expressivos e funções com responsabilidade única.
- **SOLID, KISS & YAGNI**: Simplicidade como virtude central; rejeição a soluções especulativas.
- **Tipagem Estática**: Adoção de tipagem estática (TypeScript ou JSDoc tipado / Python type hints) quando a stack evoluir além de scripts triviais.

#### 2. Controles de Qualidade Obrigatórios
- **Linters & Formatadores**: Linters e formatadores automatizados compatíveis com a stack (ex.: ESLint, Prettier, Stylelint).
- **Análise Estática**: Execução obrigatória de análise estática sem avisos ou erros não tratados.
- **Revisão e Validação CI/CD**: Toda alteração DEVE ser submetida à verificação automática em pipeline de integração contínua.
- **Remoção de Código Morto**: Proibição de código legado comentado ou arquivos órfãos não utilizados.
- **Critério de Inclusão de Dependências**: Novas dependências exigem justificativa formal, auditoria de vulnerabilidades, licença permissiva e cálculo do impacto no bundle size.
- **Tolerância Zero para Bypasses**: É ESTRITAMENTE PROIBIDO desabilitar linters, suprimir regras (`eslint-disable`, `@ts-ignore`), ignorar testes ou contornar verificações obrigatórias.

---

### IV — Design System como Fonte Única da Verdade

O Design System da Ariramba Sistemas DEVE atuar como a única autoridade visual e de interação na construção das interfaces.

#### 1. Identidade Visual
- Estética minimalista, profissional, tecnológica e moderna, refletindo precisão e confiança.
- Hierarquia tipográfica e espacial nítida; combate à poluição visual.
- Uso sóbrio e intencional de contrastes, sombras e animações sutis.

#### 2. Design Tokens
Todos os componentes DEVEM consumir tokens centralizados definidos em variáveis CSS (`:root` em `css/style.css`):
- Cores primárias, secundárias, neutras, superfícies e cores funcionais (sucesso, alerta, erro).
- Escala tipográfica (`font-family`, tamanhos, pesos, alturas de linha).
- Escala de espaçamentos (padding, margin, gap).
- Raios de borda (`border-radius`), espessuras e sombras (`box-shadow`).
- Breakpoints responsivos padronizados.
- Transições, curvas de aceleração (`cubic-bezier`) e durações.
- *Proibido o uso de valores mágicos, cores hexadecimais soltas ou dimensões arbitrárias no código dos componentes.*

#### 3. Componentes
- Componentes autocontidos, responsivos, acessíveis e reutilizáveis.
- Documentação clara de variantes, estados (`hover`, `focus-visible`, `active`, `disabled`) e propriedades.
- *Nenhum agente tem autorização para alterar a identidade da marca, introduzir frameworks de UI externos (Bootstrap, Tailwind, etc.) ou alterar paletas sem aprovação humana expressa.*

---

### V — Experiência Interativa Orientada à Conversão

A experiência do usuário (UX) DEVE aliar usabilidade fluida, clareza cognitiva e caminhos de conversão descomplicados.

#### 1. Experiência do Usuário (UX)
- **Compreensão Imediata**: O visitante deve compreender a proposta de valor e os serviços nos primeiros 5 segundos.
- **Abordagem Mobile-First**: Interfaces concebidas primariamente para dispositivos móveis e enriquecidas progressivamente para desktops.
- **UX Writing & CTAs**: Chamadas para ação (CTAs) contextuais, honestas e convidativas; textos objetivos sem jargões desnecessários.
- **Formulários Enxutos**: Coleta exclusiva dos dados estritamente necessários ao contato inicial.
- **Ética de Conversão**: São TERMINANTEMENTE PROIBIDOS dark patterns, contadores falsos de urgência, navegação enganosa ou armadilhas de consentimento.

#### 2. Interatividade Funcional
- Microinterações suaves que confirmem ações do usuário e ofereçam feedback tátil/visual imediato.
- Tratamento explícito de estados de interface: carregamento (`loading`), sucesso, erro de preenchimento e indisponibilidade.
- Respeito mandatório à preferência de redução de movimento do sistema (`prefers-reduced-motion: reduce`).
- Independência de dispositivos apontadores: nenhuma informação crítica pode depender exclusivamente de interação via mouse (`hover`).

---

### VI — Acessibilidade por Concepção (Accessibility First)

A acessibilidade digital DEVE ser integrada em todas as fases de concepção, codificação e validação técnica.

#### 1. Conformidade Normativa
- Adoção mandatória das diretrizes **WCAG 2.2 no nível AA**, assegurando usabilidade integral para pessoas com deficiências visuais, auditivas, motoras e cognitivas.

#### 2. HTML Semântico Nativo
- Utilização prioritária dos elementos semânticos do HTML5: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<button>`, `<dialog>`, `<figure>`, `<figcaption>`.
- Proibição de substituição de botões nativos (`<button>`) ou links (`<a>`) por `<div>` ou `<span>` interativos com eventos de clique improvisados.

#### 3. Tecnologias Assistivas e Navegação
- Suporte pleno e testado a leitores de tela (VoiceOver, NVDA).
- Navegação completa por teclado com indicador visual de foco nítido (`focus-visible`).
- Ordem lógica e sequencial no fluxo do foco (DOM alinhado à apresentação visual).
- Mecanismos para pular navegações repetitivas (ex.: "Skip to content").

#### 4. WAI-ARIA
- Utilização criteriosa de atributos ARIA (`aria-label`, `aria-expanded`, `aria-controls`, `aria-live`, etc.) apenas para complementar a semântica nativa quando esta for insuficiente.
- Proibição de ARIA redundante ou conflitante com a semântica nativa.

#### 5. Conteúdo e Mídias
- Textos alternativos (`alt`) descritivos e precisos em imagens informativas; `alt=""` explícito em imagens puramente decorativas.
- Contraste de cor mínimo de 4.5:1 para texto normal e 3:1 para texto grande ou componentes essenciais.
- Nunca transmitir informações exclusivamente por meio de cor.

#### 6. Validação Contínua
- Validação automatizada via `axe-core` em testes locais e no pipeline de CI.
- Auditorias com Lighthouse (meta: 100 em acessibilidade).
- Verificação manual com navegação por teclado e leitores de tela. Nenhuma tarefa é concluída com violações de acessibilidade.

---

### VII — Security by Design e DevSecOps

A segurança da informação e a privacidade por concepção DEVEM ser pilares estruturantes do projeto, espelhando a qualidade dos serviços de cibersegurança e tecnologia da Ariramba Sistemas.

#### 1. Referências Normativas
- Alinhamento aos padrões **OWASP Top 10** e **OWASP ASVS**.
- Conformidade integral com a **Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)**.
- Princípios de Privacy by Design e Minimização de Dados.

#### 2. Controles de Segurança Mandatórios
- **HTTPS & Transporte Seguro**: Tráfego 100% criptografado em produção via TLS moderno.
- **Cabeçalhos de Segurança (HTTP Security Headers)**: Configurar Content Security Policy (CSP) restritiva, X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Referrer-Policy e Permissions-Policy adequados.
- **Sanitização e Validação**: Validação estrita de todos os inputs do lado cliente e do lado servidor (quando existente). Proteção ativa contra XSS, injeções e adulterações.
- **Gestão de Segredos**: Proibição absoluta de credenciais, chaves de API, senhas ou tokens no código-fonte. Uso de variáveis de ambiente e secret managers seguros.
- **CORS & Rate Limiting**: Políticas de CORS estritas e limitação de taxa em endpoints e formulários públicos contra abuso ou spam.

#### 3. Práticas DevSecOps & Ferramenta Strix
- Integração de SAST (análise estática), SCA (análise de vulnerabilidades em dependências) e detecção automatizada de segredos no repositório.
- **Validação com Strix**: A ferramenta **Strix** DEVE ser executada obrigatoriamente antes de publicações relevantes, alterações em formulários, APIs ou ampliações da superfície de exposição.
- Bloqueio imediato de deploys diante de vulnerabilidades críticas ou altas confirmadas e não mitigadas.

---

### VIII — Performance First, SEO, GEO e Descoberta por IA

A velocidade de carregamento, a otimização técnica para buscadores (SEO) e a inteligibilidade para mecanismos de inteligência artificial (GEO/AEO) DEVEM ser nativas na plataforma.

#### 1. Engenharia de Performance
- Otimização rigorosa de recursos estáticos: conversão de imagens para WebP/AVIF, SVGs minificados e fontes locais em formato WOFF2 com `font-display: swap`.
- Minificação obrigatória de CSS e JavaScript (`esbuild`).
- Utilização de `loading="lazy"` e `decoding="async"` em imagens abaixo da dobra (*below the fold*).
- Eliminação de dependências bloqueantes de renderização no `<head>`.
- Orçamentos de performance (*performance budgets*) respeitados em cada entrega.

#### 2. Metas de Qualidade Obrigatórias (Lighthouse & Core Web Vitals)
Em auditorias de produção sob condições padronizadas:

| Indicador | Meta Obrigatória |
| :--- | :--- |
| **Lighthouse Performance** | $\ge 95$ |
| **Lighthouse Acessibilidade** | $100$ |
| **Lighthouse Boas Práticas** | $\ge 95$ |
| **Lighthouse SEO** | $100$ |
| **LCP (Largest Contentful Paint)** | $\le 2,5\text{ s}$ |
| **INP (Interaction to Next Paint)** | $\le 200\text{ ms}$ |
| **CLS (Cumulative Layout Shift)** | $\le 0,1$ |

#### 3. SEO Técnico Estruturado
- URLs canônicas, títulos semânticos, meta tags descritivas e tags Open Graph / Twitter Cards completas.
- Manutenção rigorosa de `sitemap.xml` e `robots.txt` autorizando indexação por robôs tradicionais e bots de IA.
- Dados estruturados ricos via Schema.org em formato JSON-LD (`Organization`, `WebSite`, `Service`, `FAQPage`, etc.).
- SEO local detalhando áreas atendidas e dados de contato institucionais verificados.

#### 4. GEO (Generative Engine Optimization) e Arquivos para IAs
- Manutenção dos arquivos [robots.txt](file:///Users/thalysonwilker/Projects/Ariramba/site-principal/robots.txt) e `llms.txt` (e `llms-full.txt` se aplicável) na raiz pública.
- O arquivo `llms.txt` DEVE fornecer descrição concisa, estruturada e precisa da empresa, planos, diferenciais técnicos e links canônicos, servindo como referência para modelos como ChatGPT, Claude, Gemini e Perplexity.
- Proibição de informações inverídicas, promessas fraudulentas ou spam semântico com intuito manipulatório.

---

### IX — Test-First, Quality Gates e Cobertura Superior a 90%

O ciclo de engenharia DEVE adotar a metodologia **Test-First (TDD)** e controles automatizados de qualidade (*Quality Gates*) intransponíveis.

#### 1. Ciclo de Testes
Aplicar o ciclo Red-Green-Refactor a todo comportamento testável:
1. **Red**: Escrever teste representativo do critério de aceite antes da implementação (o teste falha).
2. **Green**: Escrever o código mínimo necessário para fazer o teste passar.
3. **Refactor**: Refatorar o código visando legibilidade, modularidade e performance sem quebrar o teste.

#### 2. Ferramentas Padronizadas
- **JavaScript / TypeScript**: Adotar **Vitest** como framework oficial de testes unitários e de integração.
- **Python**: Adotar **Pytest** para serviços e utilitários em Python.
- **Ferramentas Complementares**: Testing Library para componentes DOM, Playwright para testes ponta a ponta (E2E), `axe-core` para acessibilidade automatizada, Strix para segurança e k6 para testes de carga quando aplicável.

#### 3. Meta de Cobertura de Testes
- **A cobertura de testes DEVE ser estritamente superior a 90%** para todo o código testável (linhas, funções e ramos).
- A cobertura deve ser calculada de forma independente por serviço ou aplicação, sendo vedado mascarar componentes deficientes em médias agregadas.
- Toda correção de bug DEVE obrigatoriamente acompanhar teste de regressão que reproduza a falha corrigida.

#### 4. Quality Gates no CI/CD
O pipeline de CI/CD DEVE bloquear o merge e o deploy caso haja:
- Falha de compilação ou minificação.
- Falhas em linters ou erros de tipagem estática.
- Testes automatizados quebrados ou instáveis (*flaky*).
- Cobertura de testes $\le 90\%$.
- Violações de acessibilidade incompatíveis com WCAG 2.2 AA.
- Vulnerabilidades críticas ou altas de segurança reportadas pelo Strix ou SCA.
- Regressões em métricas de performance fora dos limiares estabelecidos.

---

### X — Spec-Driven Development e Governança de Agentes

O projeto adota o **GitHub Spec Kit** como metodologia oficial de engenharia orientada por especificações. Todo desenvolvimento de relevância deve ser rastreável do conceito à produção.

#### 1. Ciclo Formal do Spec Kit
Toda feature segue rigorosamente os estágios coordenados por slash commands / skills:
1. `/speckit-constitution`: Princípios supremos e regras permanentes do projeto.
2. `/speckit-specify`: Definição de requisitos, histórias de usuário e critérios de aceite mensuráveis.
3. `/speckit-clarify`: Identificação e eliminação de ambiguidades antes do desenho técnico.
4. `/speckit-plan`: Planejamento arquitetural, verificação de conformidade e decisões de design.
5. `/speckit-tasks`: Decomposição do plano em tarefas atômicas, sequenciais e priorizadas por história.
6. `/speckit-analyze`: Verificação de consistência cruzada entre especificação, plano e tarefas.
7. `/speckit-implement`: Execução das tarefas aprovadas em estrito alinhamento ao plano.
8. `/speckit-converge`: Verificação de aderência final e identificação de trabalho remanescente.

#### 2. Rastreabilidade Total
Garantir correspondência bidirecional contínua:
$$\text{Requisito} \longleftrightarrow \text{Especificação} \longleftrightarrow \text{Plano} \longleftrightarrow \text{Tarefa} \longleftrightarrow \text{Código} \longleftrightarrow \text{Teste} \longleftrightarrow \text{Evidência}$$

#### 3. Idioma Oficial e Documentação Humano-Cêntrica
- **Português do Brasil Obrigatório**: Toda a documentação (`README.md`, `AGENTS.md`, `specs/`, planos, tarefas, ADRs, guias, relatórios de segurança e mensagens de commit) DEVE ser escrita em português claro e escorreito.
- Termos técnicos internacionais, identificadores de código (`functions`, `classes`, comandos de terminal) podem permanecer em inglês para preservar convenções padrão da indústria.
- **Markdown Semântico**: Documentos formatados com hierarquia de títulos consistente, parágrafos objetivos, tabelas comparativas e blocos de código com identificação sintática.
- Documentar tanto *o que* foi feito quanto as *justificativas e alternativas rejeitadas*.

#### 4. Controle de Versão, Commits e ADRs
- Controle de versão via Git com branches temáticas (`feature/`, `fix/`, `docs/`).
- Commits atômicos no formato **Conventional Commits** em português (ex.: `feat: adiciona componente de contato`, `test: cobre validacao de email`).
- Registro formal de decisões técnicas relevantes através de **ADRs** em `docs/adr/`.

#### 5. Governança e Limites dos Agentes de IA
Os agentes de inteligência artificial são considerados colaboradores técnicos sujeitos às mesmas restrições e padrões exigidos dos engenheiros humanos.

**Obrigações dos Agentes**:
- Ler e respeitar a Constituição, as especificações vigentes e os planos aprovados antes de alterar código.
- Priorizar reutilização de componentes e simplicidade técnica.
- Apresentar evidências concretas de validação e testes para cada tarefa executada.
- Reportar de forma transparente riscos, dívidas técnicas ou inconsistências detectadas.

**Proibições Absolutas aos Agentes**:
- NÃO alterar código sem especificação aprovada ou fora do escopo da tarefa ativa.
- NÃO realizar alterações arquiteturais unilaterais ou introduzir bibliotecas sem justificativa.
- NÃO remover, suprimir, ignorar ou falsificar testes, linters ou relatórios de segurança.
- NÃO expor segredos, senhas ou dados sensíveis em arquivos do repositório.
- NÃO realizar ações destrutivas no repositório sem consentimento humano explícito.
- NÃO alterar a Constituição unilateralmente.

---

## Requisitos Transversais

Toda e qualquer especificação, plano ou tarefa DEVE analisar e contemplar explicitamente os seguintes vetores de qualidade:

1. **Segurança e Privacidade (LGPD)**
2. **Acessibilidade Digital (WCAG 2.2 AA)**
3. **Performance e Core Web Vitals**
4. **Observabilidade e Rastreabilidade**
5. **Responsividade Mobile-First**
6. **Manutenibilidade e Testabilidade (TDD)**
7. **Consistência com o Design System**
8. **Descoberta por Mecanismos de Busca e IA (SEO / GEO)**
9. **Documentação em Português do Brasil**

---

## Definition of Done (Critérios de Conclusão)

Uma tarefa, funcionalidade ou incremento técnico SOMENTE será considerado concluído (*Done*) quando satisfizer cumulativamente:

- [ ] Requisitos funcionais e de negócio da especificação plenamente atendidos.
- [ ] Critérios de aceitação validados por testes independentes.
- [ ] Implementação em conformidade com a arquitetura e diretrizes de simplicidade.
- [ ] Aderência integral ao Design System e aos design tokens.
- [ ] Bateria de testes automatizados aprovada com cobertura superior a 90% no código testável.
- [ ] Ausência de violações de lint, erros de compilação ou falhas de tipagem estática.
- [ ] Conformidade de acessibilidade comprovada (WCAG 2.2 AA, axe-core e navegação por teclado).
- [ ] Verificações de segurança executadas (Strix, SAST, auditoria de dependências) sem vulnerabilidades críticas/altas.
- [ ] Metas de performance e Core Web Vitals respeitadas (Lighthouse $\ge 95$).
- [ ] Build e minificação de produção executados com sucesso (`css/style.min.css`, `js/main.min.js`).
- [ ] Metadados de SEO, marcações Schema.org e arquivos de IA (`robots.txt`, `llms.txt`) atualizados quando aplicável.
- [ ] Documentação técnica e comentários atualizados em português do Brasil.
- [ ] Decisões arquiteturais registradas em ADR (quando aplicável).
- [ ] Commit realizado segundo o padrão Conventional Commits em branch apropriada.
- [ ] Quality Gates do CI/CD aprovados sem contornos manuais.
- [ ] Aprovação humana obtida para conclusão da entrega.

---

## Governança Constitucional

1. **Supremacia da Constituição**: Esta Constituição prevalece sobre qualquer especificação, plano de implementação, preferência individual ou decisão pontual de agentes e desenvolvedores.
2. **Resolução de Conflitos**: Diante de divergência ou proposta incompatível com a Constituição:
   - A alteração DEVE ser imediatamente suspensa.
   - O princípio conflitante DEVE ser formalmente identificado e explicado.
   - Alternativas compatíveis DEVEM ser formuladas e submetidas para deliberação humana.
3. **Regime de Exceções**: Qualquer desvio temporário aos princípios desta Constituição exige aprovação expressa do responsável humano, com justificativa técnica documentada, análise de riscos e data limite para adequação.
4. **Processo de Emenda**: Emendas constitucionais exigem justificativa, descrição das alterações, análise de impacto sistêmico e aprovação do responsável pelo projeto.
5. **Versionamento Semântico Constitucional**:
   - **MAJOR**: Inclusão, alteração substancial ou revogação de princípios e regras fundamentais.
   - **MINOR**: Acréscimo de diretrizes operacionais, seções complementares ou expansão de requisitos.
   - **PATCH**: Correções ortográficas, ajustes textuais e clarificações que não afetem diretrizes mandatórias.

---

## Diagnóstico de Conformidade e Lacunas Atuais da Base de Código

Com base na auditoria realizada na estrutura atual do repositório (`site-principal`), são registradas as seguintes características e lacunas de conformidade frente a esta Constituição v2.0.0:

### 1. Elementos em Conformidade Existente
- **Stack Tecnológica Básica**: O projeto baseia-se em HTML5 semântico, Vanilla CSS modular e Vanilla JavaScript, atendendo ao princípio de simplicidade e baixo atrito (Princípios I, II e IV).
- **Processo de Minificação**: Presença de scripts minificados via `esbuild` (`css/style.min.css` e `js/main.min.js`).
- **SEO e Robôs de IA**: Existência de `robots.txt` com regras explícitas para agentes e bots de IA generativa (OAI-SearchBot, ClaudeBot, PerplexityBot, etc.) e arquivo de dados `llms.txt` já presente em `landing-pages/llms.txt` (Princípio VIII).
- **Publicação Estática**: Pipeline de deploy automatizado via GitHub Actions em `.github/workflows/deploy.yml` para GitHub Pages sob o domínio `arirambasistemas.com.br` (Princípio VIII).

### 2. Lacunas e Incompatibilidades a Adequar (Ações Futuras Recomendadas)
1. **Ambiente de Testes Automatizados (Vitest)**: Não existe atualmente arquivo de configuração ou dependências para testes (`package.json`, Vitest). Uma especificação própria DEVE ser criada para configurar o ambiente de testes unitários e de integração com cobertura > 90% (Princípio IX).
2. **Controles de Linters e Formatação**: Ausência de ESLint, Prettier e Stylelint configurados no repositório. Necessidade de estruturação de linters com execução em pre-commit ou CI (Princípio III).
3. **Quality Gates e Verificação de Segurança (Strix / CI)**: O fluxo atual `.github/workflows/deploy.yml` apenas copia os arquivos estáticos e publica no GitHub Pages sem validações de lint, testes automatizados, auditoria de acessibilidade (`axe-core`) ou segurança via **Strix** (Princípios III, VI, VII e IX).
4. **Containerização e Docker**: Ausência de `Dockerfile` e `docker-compose.yml` para reprodução local padronizada (Princípio II).
5. **Unificação de Metadados na Raiz**: O arquivo `llms.txt` e `sitemap.xml` residem atualmente apenas em `landing-pages/`. Recomenda-se espelhamento ou consolidação na raiz do domínio principal para máxima descoberta por IA e buscadores (Princípio VIII).
6. **Centralização do Design System**: As variáveis CSS estão presentes em `css/style.css`, mas precisam de formalização documental completa como design tokens oficiais (Princípio IV).

*Estas lacunas representam o roadmap de evolução técnica da governança e devem ser solucionadas através de especificações sequenciais via GitHub Spec Kit, sem alterações destrutivas intempestivas.*
