# Especificação da Funcionalidade: Auditoria de Acessibilidade, Coesão e Redundância de Conteúdo

**Branch da Feature**: `001-auditoria-acessibilidade-conteudo`

**Data de Criação**: 2026-11-24

**Status**: Rascunho

**Entrada**: Descrição do usuário: "Preciso analisar o código e verificar se segue as diretrizes de acessibilidade, coesão no conteúdo e se os textos não estão redundantes"

**Escopo auditado**: `index.html` (site principal), `css/style.css`, `js/main.js` e `landing-pages/index.html`.

## Clarifications

### Session 2026-11-24

- Q: O que fazer com o portfólio enquanto não há projetos reais? → A: Seguir sem o portfólio por enquanto: a seção sai da página publicada (inclusive menu, rodapé e filtros) e fica fora do escopo desta feature.
- Q: Como tratar e-mail e WhatsApp sem valores reais? → A: Opção A: remover da página os itens de e-mail e WhatsApp e o link "Ou, se preferir, fale pelo WhatsApp"; o formulário é o único canal de contato até haver valores reais.
- Q: Onde fica o local principal da mensagem "usamos IA em nossos processos..."? → A: Opção A: no hero; "Como trabalhamos" mantém apenas uma referência curta com redação diferente; "Sobre" e "Tecnologias" deixam de mencioná-la.
- Q: Qual o destino dos links "Conhecer ..." dos serviços? → A: Páginas dedicadas dos demais serviços serão implementadas no futuro; por ora (opção A) "Landing pages" leva a `/landing-pages/` e Aplicativos, Sistemas e Segurança usam "Solicitar orçamento de [serviço]", que rola ao formulário, sem prometer página inexistente.
- Q: Quais são os nomes oficiais dos serviços? → A: Opção A: Landing Pages, Aplicativos Mobile, Sistemas Web, Segurança em Vibe Coding, Consultoria em IA.
- Q: O que fazer com a tira de tecnologias e as etiquetas repetidas dos cartões? → A: Opção A: remover a tira de tecnologias (a seção "Tecnologias" já cobre) e, nas etiquetas dos cartões, remover as que repetem o selo, mantendo apenas as que acrescentam informação.

## 1. Alinhamento Comercial & Institucional *(mandatório - Princípio I)*

- **Objetivo Comercial**: Aumentar a conversão do site institucional removendo barreiras de uso (pessoas com deficiência, leitores de tela, teclado) e dúvidas de mensagem (textos repetidos, links que não levam ao que prometem, conteúdo provisório visível).
- **Público Atendido**: Pessoas físicas, profissionais e empresas que visitam o site para contratar landing pages, aplicativos, sistemas, segurança em vibe coding ou consultoria em IA.
- **Resultado Esperado**: Site que atende WCAG 2.2 AA, com mensagem única e consistente por seção, sem texto provisório e com cada chamada para ação levando ao destino anunciado.

---

## 2. Cenários de Usuário & Testes *(mandatório)*

### História de Usuário 1 - Navegar e contatar a empresa sem barreiras de acessibilidade (Prioridade: P1) 🎯 MVP

Uma pessoa que usa teclado ou leitor de tela consegue percorrer o site, abrir o menu, responder ao aviso de cookies, filtrar o portfólio e enviar o formulário de contato entendendo cada erro e cada confirmação.

**Por que esta prioridade**: Acessibilidade é requisito constitucional (Princípio VI, "nenhuma tarefa é concluída com violações") e o formulário é o principal ponto de conversão.

**Teste Independente**: Percorrer a página somente com teclado e com um leitor de tela, e executar auditoria automatizada (Lighthouse e axe-core); o resultado deve ter zero violações.

**Critérios de Aceite**:

1. **Dado** que a pessoa abre o site pela primeira vez, **Quando** o aviso de cookies aparece, **Então** o foco e a leitura do leitor de tela são conduzidos ao aviso, é possível aceitar ou recusar apenas com teclado e, ao fechar, o foco retorna a um ponto lógico da página.
2. **Dado** que a pessoa envia o formulário com nome ou e-mail inválido, **Quando** o envio é recusado, **Então** cada campo com erro é identificado por texto (não apenas por cor), associado ao campo e anunciado pelo leitor de tela, e o foco vai para o primeiro campo com erro.
3. **Dado** que a pessoa preenche o formulário, **Quando** lê os rótulos, **Então** campos obrigatórios e opcionais são indicados de forma explícita e consistente.
4. **Dado** que o portfólio está fora da página, **Quando** a pessoa percorre menu, rodapé e conteúdo, **Então** não existe filtro, âncora ou link para essa seção.
5. **Dado** que a pessoa usa o menu em tela pequena, **Quando** o menu está fechado, **Então** seus links não recebem foco, e quando está aberto o foco é gerenciado e `Esc` o fecha devolvendo o foco ao botão.

---

### História de Usuário 2 - Entender a oferta sem repetição e chegar ao destino certo (Prioridade: P2)

Uma pessoa lê o site e encontra cada mensagem uma única vez, com nomes de serviços idênticos em todos os pontos e chamadas para ação que levam ao conteúdo prometido.

**Por que esta prioridade**: Repetição dilui a proposta de valor e links enganosos reduzem confiança e conversão, mas não impedem o uso do site.

**Teste Independente**: Revisar o texto da página inteira e verificar, por um glossário de mensagens, que cada ideia-chave aparece em no máximo um bloco principal e que cada link leva ao destino descrito pelo seu texto.

**Critérios de Aceite**:

1. **Dado** a mensagem "usamos IA em nossos processos para entregar com mais qualidade, desempenho e rapidez", **Quando** o texto é revisado, **Então** ela aparece integralmente apenas no hero, "Como trabalhamos" traz uma referência curta com redação diferente, e "Sobre", "Tecnologias", o indicador "Apoio de IA em cada entrega" e o chip "IA nos processos" não a repetem.
2. **Dado** os cinco serviços, **Quando** aparecem no menu, no hero, nos cartões, no portfólio e no formulário, **Então** usam exatamente os mesmos nomes oficiais: "Landing Pages", "Aplicativos Mobile", "Sistemas Web", "Segurança em Vibe Coding" e "Consultoria em IA".
3. **Dado** o cartão de landing pages, **Quando** a pessoa ativa seu link, **Então** chega à página dedicada `/landing-pages/`; **Dado** os cartões de aplicativos, sistemas e segurança (sem página própria por enquanto), **Quando** a pessoa ativa o link, **Então** o texto é "Solicitar orçamento de [serviço]" e a ação rola ao formulário; esses links passam a apontar para páginas dedicadas apenas quando elas existirem (feature futura).
4. **Dado** a seção "Tecnologias" como única fonte sobre tecnologias, os indicadores "Como trabalhamos" e as etiquetas dos cartões, **Quando** comparados às seções que detalham o mesmo assunto, **Então** a tira de tecnologias não existe e cada etiqueta ou indicador restante acrescenta informação nova.

---

### História de Usuário 3 - Ver apenas conteúdo final e verdadeiro (Prioridade: P3)

Uma pessoa visitante não encontra marcadores provisórios, contatos inválidos ou links que não funcionam.

**Por que esta prioridade**: Impacta credibilidade, mas depende de conteúdo real a ser fornecido pelo negócio.

**Teste Independente**: Buscar no HTML publicado por colchetes `[`, "Substitua", `#portfolio` e `href="#contato"` usados como contato direto; resultado esperado: nenhuma ocorrência.

**Critérios de Aceite**:

1. **Dado** que ainda não há projetos reais, **Quando** a página é publicada, **Então** a seção de portfólio (com seus marcadores provisórios, filtros, link de menu e link de rodapé) não aparece e nenhum link interno aponta para ela.
2. **Dado** que ainda não há e-mail nem WhatsApp reais, **Quando** a seção de contato é exibida, **Então** ela contém somente o formulário, sem itens de e-mail, WhatsApp ou link alternativo para WhatsApp.
3. **Dado** o rodapé, **Quando** a pessoa ativa "Política de cookies", **Então** encontra a política completa (e não apenas reabre o aviso), ou o rótulo descreve fielmente a ação ("Gerenciar cookies").

---

### Casos Extremos & Tratamento de Erros

- Pessoa com JavaScript desativado: todo o conteúdo permanece legível (hoje elementos de revelação dependem de classe aplicada via script) e o formulário informa que o envio exige JavaScript ou oferece alternativa.
- Pessoa com preferência por movimento reduzido: animações de revelação e elementos flutuantes são desativados.
- Zoom de 200% e reflow a 320px de largura: sem perda de conteúdo ou rolagem horizontal.
- Texto aumentado pelo usuário: sem sobreposição ou corte em cartões, filtros e cabeçalho.
- Falha de envio do formulário: mensagem de erro clara, acessível e com orientação de nova tentativa.
- Rótulos de links repetidos ("Conhecer ...", "Ver projeto") fora de contexto: cada link tem nome acessível único e descritivo.

---

## 3. Requisitos Funcionais *(mandatório)*

### Acessibilidade

- **RF-001**: O sistema DEVE conduzir o foco ao aviso de cookies quando exibido, declará-lo como diálogo modal acessível, permitir fechá-lo por teclado e devolver o foco ao fechar.
- **RF-002**: O formulário DEVE exibir mensagens de erro em texto junto a cada campo inválido, associá-las ao campo, marcar o campo como inválido e mover o foco ao primeiro erro; a confirmação de sucesso DEVE ser anunciada.
- **RF-003**: O formulário DEVE indicar quais campos são obrigatórios (nome e e-mail) e quais são opcionais, e DEVE manter rótulos visíveis; textos de exemplo não substituem rótulos.
- **RF-004**: O menu móvel fechado DEVE ficar inacessível ao teclado e a leitores de tela; o aberto DEVE gerenciar o foco e fechar com `Esc`, devolvendo o foco ao botão.
- **RF-005**: A seção de portfólio DEVE ser removida da página publicada (incluindo menu, menu móvel, rodapé e opções de filtro) até existirem projetos reais; quando for reintroduzida em feature futura, seus filtros DEVEM anunciar o resultado da filtragem e impedir o acesso a itens ocultos.
- **RF-006**: Listas devem usar a semântica adequada: listas ordenadas apenas para sequências reais (etapas), não para o bloco "sinais de que é hora de usar a tecnologia".
- **RF-007**: Todo link e botão DEVE ter nome acessível único e descritivo no contexto (ex.: "Conhecer o serviço de landing pages", não apenas "Conhecer"), e links que abrem destinos diferentes NÃO DEVEM ter o mesmo texto.
- **RF-008**: Todo conteúdo informativo em elementos marcados como decorativos (por exemplo textos dentro de blocos ocultos ao leitor de tela) DEVE estar também disponível em outro ponto acessível da página.
- **RF-009**: Contraste de texto e componentes de interface DEVE atender WCAG 2.2 AA (4.5:1 para texto normal, 3:1 para texto grande e componentes), incluindo selos, etiquetas, texto em fundos escuros e estados de foco; alvos de toque DEVEM ter no mínimo 24×24 px.
- **RF-010**: A hierarquia de títulos DEVE ser contínua (um `h1`; `h2` por seção; sem saltos) e cada seção DEVE ter nome de região consistente.
- **RF-011**: O botão "Voltar ao topo" e demais controles DEVEM ter tipo, nome e foco visível; o rolar ao topo DEVE respeitar a preferência de movimento reduzido.

### Coesão e Redundância de Conteúdo

- **RF-012**: Cada ideia-chave de proposta de valor (uso de IA nos processos; resultados práticos em menos tempo; linguagem clara; LGPD) DEVE ter um único local principal, sem repetição literal em hero, sobre, serviços, processo, tecnologias e metadados. O local principal da ideia "uso de IA nos processos" é o hero; "Como trabalhamos" pode ter apenas uma referência curta com redação diferente.
- **RF-013**: Os nomes dos cinco serviços DEVEM ser idênticos em menu, hero, cartões, opções do formulário e rodapé, usando exclusivamente: "Landing Pages", "Aplicativos Mobile", "Sistemas Web", "Segurança em Vibe Coding" e "Consultoria em IA".
- **RF-014**: A tira de tecnologias abaixo do hero DEVE ser removida (a seção "Tecnologias" já cobre o assunto); as etiquetas dos cartões de serviço que repetem o selo DEVEM ser removidas, mantendo apenas as que acrescentam informação; demais elementos redundantes (rótulos flutuantes do hero, indicadores "Como trabalhamos") DEVEM ser removidos ou reescritos para acrescentar informação nova.
- **RF-015**: O mesmo texto de chamada para ação NÃO DEVE aparecer em contextos distintos (ex.: "Fale com a gente" no menu e como título do formulário); cada chamada DEVE descrever a ação específica.
- **RF-016**: O texto de cada seção DEVE apoiar o título da seção e o fluxo narrativo (problema → serviços → prova → processo → tecnologia → contato), sem termos de jargão não explicados (ex.: "vibe coding", "MCP", "GEO") sem uma frase curta de explicação.
- **RF-017**: Links de serviço DEVEM levar ao conteúdo prometido: o de landing pages DEVE apontar para `/landing-pages/`; os de aplicativos, sistemas e segurança DEVEM usar o texto "Solicitar orçamento de [serviço]" e rolar ao formulário até que existam páginas dedicadas.
- **RF-018**: O site NÃO DEVE conter texto provisório, colchetes de preenchimento ou contatos inválidos em produção; enquanto não houver e-mail e WhatsApp reais, a seção de contato DEVE oferecer apenas o formulário e o texto da página DEVE referir-se somente a ele (sem menção a e-mail ou WhatsApp como canal).
- **RF-019**: Títulos de página, descrições e rodapé DEVEM usar o mesmo posicionamento de marca, sem versões divergentes.
- **RF-020**: As mesmas diretrizes de RF-001 a RF-019 DEVEM ser aplicadas a `landing-pages/index.html`, incluindo o campo-isca (honeypot) do formulário, que não pode ser anunciado nem focável.

---

## 4. Requisitos Transversais *(mandatório - Constituição v2.0.0)*

- **Segurança (Princípio VII)**: As correções não devem introduzir novos scripts de terceiros; o carregamento do pixel permanece condicionado ao consentimento; mensagens de erro não expõem dados do usuário.
- **Acessibilidade (Princípio VI)**: Conformidade WCAG 2.2 AA, HTML5 semântico, navegação completa por teclado, ARIA apenas quando o HTML nativo não basta; validação com Lighthouse (100), axe-core e leitor de tela.
- **Performance (Princípio VIII)**: Nenhuma regressão: Lighthouse Performance >= 95 e Core Web Vitals mantidos; arquivos minificados regenerados após as alterações.
- **Design System (Princípio IV)**: Ajustes de cor e foco usam os tokens existentes em `css/style.css`; novos valores entram como tokens.
- **SEO & GEO (Princípio VIII)**: Título, descrição, `llms.txt` e dados estruturados acompanham as mudanças de nomes e textos; sem redução de palavras-chave de serviço.
- **Testes (Princípio IX)**: Auditorias de acessibilidade automatizadas e verificação de conteúdo (colchetes, links duplicados, nomes de serviço) incluídas como critérios de aceite, sem adotar framework de testes JS nem `package.json` (decisão do responsável: site HTML puro); a meta de cobertura da Constituição não se aplica a esta feature.

---

## 5. Critérios de Sucesso Mensuráveis *(mandatório)*

- **CS-001**: Lighthouse Acessibilidade = 100 e zero violações no axe-core em `index.html` e `landing-pages/index.html`.
- **CS-002**: 100% dos fluxos (menu, cookies, filtros, formulário) concluídos apenas com teclado e com leitor de tela, sem armadilhas de foco.
- **CS-003**: Zero ocorrências de texto provisório (colchetes, "Substitua") e zero contatos inválidos no site publicado.
- **CS-004**: Nenhuma frase de proposta de valor repetida literalmente em mais de um bloco; nomes dos cinco serviços idênticos em 100% das ocorrências.
- **CS-005**: 100% dos links de serviço levam ao destino que seu texto anuncia, e nenhum par de links com o mesmo texto aponta para destinos diferentes.
- **CS-006**: Pelo menos 90% de pessoas em teste de leitura rápida conseguem dizer, após 30 segundos, quais são os serviços e como entrar em contato.

---

## Entidades-Chave

- **Achado de auditoria**: problema identificado, com categoria (acessibilidade, coesão ou redundância), local, severidade e correção esperada.
- **Mensagem-chave**: ideia de proposta de valor com um local principal de exibição.
- **Serviço**: nome oficial, descrição curta, destino e opção de formulário correspondente.

## Suposições

- A seção de portfólio está fora do escopo desta feature e será retirada da página até haver projetos reais (decisão da sessão de clarificação de 2026-11-24).
- Os contatos reais (e-mail e WhatsApp) serão fornecidos pelo negócio e reintroduzidos em feature futura; até lá o formulário é o único canal.
- O envio do formulário segue como validação no cliente até existir backend; a especificação trata apenas da acessibilidade e clareza do fluxo.
- Os textos continuam em português do Brasil (pt-BR).
- A auditoria cobre apenas os arquivos listados em "Escopo auditado".

## Achados Preliminares da Análise do Código

**Acessibilidade**

1. Aviso de cookies com `role="dialog"` sem `aria-modal` nem gestão de foco; abre por temporizador (1,2 s) sem anúncio ao leitor de tela.
2. Formulário: erros indicados apenas por classe visual `err` (sem texto, `aria-invalid` ou `aria-describedby`); campos obrigatórios (Nome, E-mail) sem indicação, enquanto "Empresa (opcional)" indica o contrário.
3. Menu móvel: sem gestão de foco nem ocultação ao teclado quando fechado (a confirmar no CSS); `Esc` não devolve o foco ao botão.
4. Filtros do portfólio: `aria-pressed` correto, porém sem anúncio do resultado e sem confirmação de que itens ocultos saem da ordem de foco.
5. Bloco "sinais" usa lista ordenada (`ol`) sem sequência real.
6. Quatro links "Conhecer ..." e três "[Ver projeto]" com mesmo destino; textos curtos e pouco descritivos fora de contexto.
7. `hero-art` com `aria-hidden` contém texto de serviços (informação repetida, ver redundância).
8. Botão "Voltar ao topo" sem `type`; rolagem sem respeito a movimento reduzido via script.
9. "Política de cookies" no rodapé é um botão que reabre o aviso, não uma política.
10. Elementos com revelação (`.js .rv`) iniciam ocultos e dependem de script para aparecer.
11. Contraste a verificar: selos em `#dcf08a` sobre fundo escuro, `--lime-d`, etiquetas de 0,8 rem.

**Coesão**

1. Link "Conhecer landing pages" rola para o formulário, apesar de existir página dedicada em `/landing-pages/`.
2. Nomes divergentes: "Landing Pages" / "Landing Page" / "Landing pages"; "Aplicativos" / "Aplicativos Mobile"; "Sistemas" / "Sistemas Web"; "Consultoria IA" / "Consultoria em IA"; "Segurança" / "Segurança em Vibe Coding".
3. Conteúdo provisório visível: portfólio com colchetes, e-mail `[e-mail de contato]` em `mailto:` inválido, WhatsApp `[número de contato]` com `href="#contato"`.
4. "Vibe coding", "MCP" e "GEO" aparecem sem explicação.
5. Tira de tecnologias (8 itens) diverge da seção Tecnologias (lista maior, outros itens).

**Redundância**

1. "Usamos IA em nossos processos para entregar com mais qualidade, desempenho e rapidez" aparece em hero, sobre, processo e tecnologias, além do indicador "Apoio de IA em cada entrega" e do chip "IA nos processos".
2. "Resultados práticos em menos tempo" repetido na descrição, em "Sobre" e em "Serviços".
3. Subtítulo de "Serviços" enumera os cinco serviços já presentes no título e nos cartões; os rótulos flutuantes do hero repetem a mesma lista.
4. Etiquetas dos cartões repetem o selo (ex.: selo "Landing Pages" e etiqueta "Landing pages").
5. "24h a 48h" e "5 etapas" em "Como trabalhamos" repetem a seção Processo; "Sob medida" não acrescenta informação concreta.
6. "Fale com a gente" no menu e no título do formulário; subtítulos de contato e do formulário repetem a mesma promessa.
7. "Linguagem clara", "comunicação clara" e "com clareza e sem complicação" repetidos em Sobre, Processo e Contato.
