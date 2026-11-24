# Contratos de Interface: Auditoria de Acessibilidade e Conteúdo

**Feature**: [spec.md](../spec.md) | **Plano**: [plan.md](../plan.md)

O site não expõe API; os contratos descrevem o comportamento observável da interface que os testes e a validação manual devem garantir.

## C1. Aviso de cookies (`#cookieBox`)

| Item | Contrato |
| :--- | :--- |
| Papel | `role="dialog"` com `aria-labelledby="cookieTitle"` e `aria-describedby="cookieText"` (já existentes) |
| Abertura automática | Não rouba o foco; conteúdo alcançável por teclado logo após o cabeçalho de leitura ou pela ordem natural |
| Abertura pelo rodapé ("Gerenciar cookies") | Foco vai ao título do aviso (`tabindex="-1"`) |
| Fechamento | Botões "Recusar" e "Aceitar"; `Esc` fecha; foco retorna ao elemento de origem (rodapé) ou permanece onde estava |
| Persistência | Chave `ariramba-cookies` = `aceito` \| `recusado` (inalterada); pixel só carrega com `aceito` |
| Rótulo do rodapé | "Gerenciar cookies" |

## C2. Formulário de contato (`#leadForm`)

| Item | Contrato |
| :--- | :--- |
| Campos obrigatórios | Nome, E-mail; rótulos terminam com "(obrigatório)"; Empresa mantém "(opcional)" |
| Erro por campo | `<p id="{campo}-erro" class="field-error">` com texto; campo recebe `aria-invalid="true"` e `aria-describedby="{campo}-erro"` |
| Mensagens | Nome: "Informe seu nome."; E-mail: "Informe um e-mail válido, como nome@exemplo.com." |
| Foco | Após envio inválido, foco no primeiro campo inválido |
| Resumo | `#formMsg` (`role="status"`, `aria-live="polite"`) informa a quantidade de erros ou o sucesso |
| Correção | Ao ficar válido, o erro e `aria-invalid` do campo são removidos |
| Canal único | Sem links de e-mail, WhatsApp ou "fale pelo WhatsApp" na página; texto do formulário não os menciona |
| Opção de serviço | Valores = nomes oficiais + "Ainda não sei" |

## C3. Navegação

| Item | Contrato |
| :--- | :--- |
| Itens do menu | Início, Sobre, Serviços, Processo, Tecnologias, Contato (sem Portfólio) — iguais no menu, menu móvel e rodapé |
| Botão do menu | `aria-expanded` e `aria-controls` corretos; rótulo alterna "Abrir menu"/"Fechar menu" |
| `Esc` | Fecha o menu móvel e devolve o foco ao botão |
| Menu móvel fechado | Não focável (`display:none`) |
| Salto de bloco | Link "Ir para o conteúdo" permanece como primeiro foco |
| Botão "Voltar ao topo" | `type="button"`, nome acessível, foco visível |

## C4. Links e botões

| Item | Contrato |
| :--- | :--- |
| Nome acessível | Único e descritivo no contexto; sem "Conhecer ..." genérico |
| Destinos | Landing pages → `/landing-pages/`; demais serviços → `#contato` com texto "Solicitar orçamento de [serviço]" |
| Duplicidade | Dois links com o mesmo texto não podem levar a destinos diferentes |
| Marcadores provisórios | Nenhum texto com `[`…`]` nem `Substitua` no HTML publicado |

## C5. Estrutura e semântica

| Item | Contrato |
| :--- | :--- |
| Títulos | Um `h1`; cada seção com `h2`; sem saltos de nível |
| Listas | `ol` apenas para sequências reais (etapas do processo, passos da consultoria); "sinais" usa `ul` |
| Imagens decorativas | `alt=""` e/ou `aria-hidden`; nenhum texto informativo dentro de bloco `aria-hidden` |
| Regiões | `header`, `nav` com `aria-label` distinto, `main#conteudo`, `footer` |
| Movimento | Animações respeitam `prefers-reduced-motion: reduce` |
| `landing-pages/index.html` | Honeypot (`.hp`) com `aria-hidden` e `tabindex="-1"` (já presentes) validado; demais itens C3–C5 aplicados quando pertinentes |

## C6. Conteúdo

| Item | Contrato |
| :--- | :--- |
| Nomes de serviços | Exatamente: Landing Pages, Aplicativos Mobile, Sistemas Web, Segurança em Vibe Coding, Consultoria em IA |
| Frases-chave | Conforme [data-model.md](../data-model.md) (mensagem-chave × local principal) |
| Termos técnicos | Vibe coding, MCP, GEO explicados em uma frase no primeiro uso |
