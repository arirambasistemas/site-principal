# Especificação da Funcionalidade: [NOME DA FUNCIONALIDADE]

**Branch da Feature**: `[###-nome-da-feature]`

**Data de Criação**: [DATA]

**Status**: Rascunho

**Entrada**: Descrição do usuário: "$ARGUMENTS"

## 1. Alinhamento Comercial & Institucional *(mandatório - Princípio I)*

- **Objetivo Comercial**: [Qual oportunidade comercial ou institucional esta funcionalidade gera?]
- **Público Atendido**: [Pessoas físicas, profissionais ou empresas?]
- **Resultado Esperado**: [Qual valor prático e mensurável o usuário final obtém?]

---

## 2. Cenários de Usuário & Testes *(mandatório)*

<!--
  As histórias de usuário devem ser PRIORIZADAS como jornadas ordenadas por importância (P1, P2, P3...).
  Cada história deve ser INDEPENDENTEMENTE TESTÁVEL, entregando valor comercial autônomo (MVP).
-->

### História de Usuário 1 - [Título Sucinto] (Prioridade: P1) 🎯 MVP

[Descreva a jornada em linguagem clara, humanizada e orientada ao valor]

**Por que esta prioridade**: [Justificativa de negócio para prioridade P1]

**Teste Independente**: [Como testar esta história de ponta a ponta de forma autônoma]

**Critérios de Aceite**:

1. **Dado** [estado inicial], **Quando** [ação realizada], **Então** [resultado esperado]
2. **Dado** [estado inicial], **Quando** [ação realizada], **Então** [resultado esperado]

---

### História de Usuário 2 - [Título Sucinto] (Prioridade: P2)

[Descreva a jornada do usuário]

**Por que esta prioridade**: [Justificativa]

**Teste Independente**: [Como validar isoladamente]

**Critérios de Aceite**:

1. **Dado** [estado inicial], **Quando** [ação realizada], **Então** [resultado esperado]

---

### Casos Extremos & Tratamento de Erros

- O que ocorre quando [condição de borda ou interrupção de conexão]?
- Como a interface comunica erros de forma acessível e compreensível?

---

## 3. Requisitos Funcionais *(mandatório)*

- **RF-001**: O sistema DEVE [capacidade específica em linguagem inequívoca]
- **RF-002**: O sistema DEVE [capacidade de interface ou validação de formulário]
- **RF-003**: Os usuários DEVEM poder [interação essencial]

*Exemplo de requisitos que exigem clarificação (/speckit-clarify):*
- **RF-004**: O sistema DEVE integrar com [PRECISA DE CLARIFICAÇÃO: serviço externo não detalhado]

---

## 4. Requisitos Transversais *(mandatório - Constituição v2.0.0)*

- **Segurança (Princípio VII)**: [Sanitização de inputs, proteção contra XSS, validação Strix]
- **Acessibilidade (Princípio VI)**: [HTML5 nativo, conformidade WCAG 2.2 AA, contraste, teclado, ARIA]
- **Performance (Princípio VIII)**: [Metas Lighthouse >= 95, Core Web Vitals, minificação esbuild]
- **Design System (Princípio IV)**: [Tokens de cores, tipografia, espaçamentos consumidos]
- **SEO & GEO (Princípio VIII)**: [Dados Schema.org, metatags, impacto em llms.txt]
- **Testes (Princípio IX)**: [Test-First com Vitest, meta de cobertura > 90%]

---

## 5. Critérios de Sucesso Mensuráveis *(mandatório)*

- **CS-001**: [Métrica mensurável, ex.: "Atingir nota 100 em Acessibilidade e >= 95 em Performance no Lighthouse"]
- **CS-002**: [Métrica comercial/UX, ex.: "Permitir solicitação de proposta em menos de 3 etapas"]
- **CS-003**: [Métrica de engenharia, ex.: "100% dos testes unitários/integração aprovados com cobertura > 90%"]
