# Modelo de Dados (Conteúdo): Auditoria de Acessibilidade, Coesão e Redundância

**Feature**: [spec.md](./spec.md) | **Plano**: [plan.md](./plan.md)

Não há banco de dados. As entidades abaixo estruturam o inventário de conteúdo usado para reescrever a página e para as verificações automatizadas de conteúdo.

## Serviço

| Campo | Descrição |
| :--- | :--- |
| `nome` | Nome oficial (único e imutável nesta feature) |
| `destino` | `/landing-pages/` ou `#contato` |
| `textoLink` | Texto do link do cartão |
| `opcaoFormulario` | Valor do `<option>` correspondente (igual a `nome`, singular onde aplicável) |

| `nome` | `destino` | `textoLink` | Observação |
| :--- | :--- | :--- | :--- |
| Landing Pages | `/landing-pages/` | Conhecer o serviço de Landing Pages | Página dedicada existe |
| Aplicativos Mobile | `#contato` | Solicitar orçamento de Aplicativos Mobile | Página futura |
| Sistemas Web | `#contato` | Solicitar orçamento de Sistemas Web | Página futura |
| Segurança em Vibe Coding | `#contato` | Solicitar orçamento de Segurança em Vibe Coding | Página futura |
| Consultoria em IA | `#contato` | Quero produzir mais com IA (botão do destaque, já existente) | Mantém CTA específico |

Regras de validação (testáveis):
- Cada `nome` aparece com grafia idêntica em menu/hero/cartões/formulário/rodapé.
- Nenhum par de links com o mesmo texto tem destinos diferentes; nenhum link "Conhecer ..." aponta para `#contato`.
- O `<option>` do formulário usa o `nome` (ex.: "Landing Pages"; a opção "Ainda não sei" permanece).

## Mensagem-chave

| Campo | Descrição |
| :--- | :--- |
| `id` | Identificador da ideia |
| `localPrincipal` | Seção onde pode aparecer com a redação completa |
| `variacoesPermitidas` | Referências curtas, com redação diferente |
| `proibidoEm` | Seções onde não deve aparecer |

| `id` | `localPrincipal` | `variacoesPermitidas` | `proibidoEm` |
| :--- | :--- | :--- | :--- |
| ia-nos-processos | Hero (`.sub`) | "Como trabalhamos": uma frase curta sobre revisão assistida por IA na validação | Sobre, Tecnologias, indicador "Apoio de IA", chip "IA nos processos", descrição `meta` |
| resultado-pratico-rapido | Hero ou `meta description` (um só) | — | Sobre, subtítulo de Serviços |
| linguagem-clara | Sobre | Processo: "você acompanha cada fase" (sem "clareza") | Contato |
| lgpd | Sobre | Texto do formulário (uso dos dados) | — |
| prazo-diagnostico | Processo (etapa 1) | — | Indicador "24h a 48h" (removido ou substituído por dado novo) |

## Achado de auditoria

| Campo | Descrição |
| :--- | :--- |
| `id` | `A11Y-nn`, `COES-nn` ou `RED-nn` |
| `local` | Arquivo e seletor |
| `requisito` | RF relacionado |
| `estado` | Aberto → Corrigido → Verificado |
| `evidencia` | Teste automatizado ou passo manual de [quickstart.md](./quickstart.md) |

Os achados preliminares da spec são o conjunto inicial; cada um vira tarefa em `tasks.md` e termina com evidência.

## Elementos removidos (inventário)

- `section#portfolio` e filtros (`.filters`, `.pf*`), links `#portfolio` no menu, menu móvel e rodapé.
- `section.stack-strip`.
- `ul.contact-list` (e-mail e WhatsApp) e `a.lead-wa`.
- Rótulos flutuantes `.fl`/`.f1–.f4` do hero.
- Código JS de filtro do portfólio e CSS associado.

## Estados do formulário

| Estado | Condição | Saída |
| :--- | :--- | :--- |
| Inicial | Sem interação | Sem mensagens; campos obrigatórios indicados no rótulo |
| Inválido | Nome vazio ou e-mail fora do padrão ao enviar | Texto de erro por campo, `aria-invalid`, resumo em `#formMsg`, foco no primeiro erro |
| Válido | Campos obrigatórios corretos | Mensagem de sucesso anunciada em `#formMsg` (`role="status"`) |
| Corrigindo | Usuário edita campo inválido | Erro do campo é removido ao ficar válido |
