# Checklist: [TIPO DE CHECKLIST] - [NOME DA FUNCIONALIDADE]

**Objetivo**: [Breve descrição do que este checklist valida]
**Data**: [DATA]
**Feature**: [Link para spec.md ou documentação relevante]

**Nota**: Este checklist é gerado pelo comando `/speckit-checklist` e incorpora a **Definition of Done (DoD)** da Constituição v2.0.0.

---

## 1. Propósito, Arquitetura & Design System (Princípios I, II e IV)

- [ ] CHK001 A funcionalidade atende ao propósito comercial ou institucional estabelecido.
- [ ] CHK002 A arquitetura é modular, reutilizável e com responsabilidades separadas.
- [ ] CHK003 Todos os estilos consomem exclusivamente os Design Tokens existentes (`css/style.css`).
- [ ] CHK004 Nenhum framework ou biblioteca externa foi introduzido sem justificativa formal.

## 2. Acessibilidade Digital & UX (Princípios V e VI - WCAG 2.2 AA)

- [ ] CHK005 Estrutura HTML estritamente semântica (<main>, <header>, <nav>, <section>, <button>, etc.).
- [ ] CHK006 Navegação por teclado 100% funcional com indicador de foco nítido (`:focus-visible`).
- [ ] CHK007 Atributos ARIA aplicados corretamente e validados via `axe-core` sem violações.
- [ ] CHK008 Imagens possuem atributos `alt` descritivos ou `alt=""` explícito se decorativas.
- [ ] CHK009 Contraste de cor atende aos critérios da WCAG 2.2 AA.
- [ ] CHK010 Preferência por movimento reduzido (`prefers-reduced-motion`) respeitada.
- [ ] CHK011 Ausência de dark patterns ou elementos manipulativos de conversão.

## 3. Segurança & DevSecOps (Princípio VII)

- [ ] CHK012 Auditoria de segurança executada com a ferramenta **Strix**.
- [ ] CHK013 Ausência de vulnerabilidades críticas ou altas confirmadas e não mitigadas.
- [ ] CHK014 Nenhum dado pessoal sensível, senha ou token exposto em código ou telemetria.
- [ ] CHK015 Entradas de usuário validadas e sanitizadas contra injeção e XSS.

## 4. Performance, SEO & GEO (Princípio VIII)

- [ ] CHK016 Minificação de produção executada via `esbuild` (`css/style.min.css`, `js/main.min.js`).
- [ ] CHK017 Imagens em formatos modernos (WebP/SVG) e com `loading="lazy"` quando aplicável.
- [ ] CHK018 Pontuações de Lighthouse atingidas: Performance $\ge 95$, Acessibilidade $100$, SEO $100$.
- [ ] CHK019 Metas de Core Web Vitals respeitadas (LCP $\le 2,5\text{s}$, INP $\le 200\text{ms}$, CLS $\le 0,1$).
- [ ] CHK020 Metadados Schema.org (JSON-LD) e alinhamento com `llms.txt` / `robots.txt` conferidos.

## 5. Test-First, Cobertura & Quality Gates (Princípios III e IX)

- [ ] CHK021 Metodologia Test-First (TDD) respeitada: testes escritos antes do código.
- [ ] CHK022 Testes automatizados executados via **Vitest** (ou Pytest) com 100% de aprovação.
- [ ] CHK023 Cobertura de testes estritamente superior a 90% para o código testável.
- [ ] CHK024 Linters e formatadores executados sem erros ou avisos desabilitados manualmente.
- [ ] CHK025 Quality Gates do CI/CD aprovados.

## 6. Governança, Idioma & Fechamento (Princípio X)

- [ ] CHK026 Toda a documentação e mensagens de commit em Português do Brasil (pt-BR).
- [ ] CHK027 Mensagens de commit no padrão Conventional Commits.
- [ ] CHK028 Rastreabilidade completa entre requisitos, especificação, tarefas e código.
- [ ] CHK029 Aprovação humana obtida para integração final.
