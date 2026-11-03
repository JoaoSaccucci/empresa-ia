# Requisitos: João Saccucci Labs

## 1. Visão do produto

Site da **João Saccucci Labs**, uma empresa em que os funcionários são agentes de IA (product-owner, artista, dev, professor) e o João é o chefe. No começo o site serve como painel pessoal para acompanhar os projetos. Depois vira portfólio público para recrutadores, mostrando o que foi construído, quem fez cada parte e como o trabalho aconteceu. Por isso precisa ter cara profissional desde o início.

**Restrições técnicas**
- HTML, CSS e JavaScript puros, sem framework e sem back-end.
- Os dados ficam em arquivos JSON (`data/projetos.json` e `data/agentes.json`). O site lê esses arquivos com `fetch` e monta as páginas.
- O site precisa funcionar no GitHub Pages.
- **Atenção:** se você abrir o `index.html` direto (com `file://`), o navegador bloqueia o `fetch` dos JSON. Para testar no computador, use um servidor local, por exemplo a extensão **Live Server** do VS Code. No GitHub Pages funciona normalmente.
- Precisa funcionar bem no celular, a partir de 360px de largura.
- **Exceção aprovada pelo João (Etapa 3):** a tela de leitura das aulas usa duas bibliotecas, `marked` (Markdown para HTML) e `highlight.js` (cores do código), carregadas por CDN com **versão fixa**. Elas só são usadas na tela de aula. O resto continua em JS puro e sem etapa de build.

**Direção visual** (quem detalha é o artista): inovador e futurista. Fundo escuro, neon e gradientes em ciano, roxo e magenta, glassmorphism, tipografia com cara de tecnologia e animações suaves. Cada agente aparece como uma "unidade de IA" com cor e avatar SVG próprios.

---

## 2. User stories

### Etapa 1

**US01: Página Início**
Como visitante (recrutador ou o próprio João), quero ver uma apresentação da João Saccucci Labs logo ao abrir o site, para entender rapidamente o que é a empresa e como ela funciona.
- [ ] A página mostra o nome "João Saccucci Labs" e um texto curto (até 3 frases) explicando o conceito: uma empresa de agentes de IA chefiada pelo João.
- [ ] Mostra o fluxo de trabalho na ordem PO → artista → dev → professor.
- [ ] Tem links ou botões que levam para as seções Projetos e Equipe.
- [ ] Há um menu de navegação presente em todas as páginas, com links para as seções disponíveis.
- [ ] No celular, o menu continua usável (pode virar um menu recolhível) e nada exige rolagem horizontal.

**US02: Lista de projetos**
Como visitante, quero ver todos os projetos da empresa em uma lista, para escolher qual quero conhecer.
- [ ] A lista é gerada a partir de `data/projetos.json`. Nenhum projeto fica escrito direto no HTML.
- [ ] Cada item mostra nome, descrição curta, status e data de início.
- [ ] Clicar em um projeto abre a página de detalhe dele.
- [ ] Se um novo projeto for adicionado ao JSON, ele aparece na lista sem mudar nenhum HTML ou JS.
- [ ] Se o JSON não carregar, aparece uma mensagem de erro amigável em vez de uma página em branco.

**US03: Detalhe do projeto**
Como visitante, quero ver o detalhe de um projeto com o trabalho de cada agente, para entender o que cada um entregou.
- [ ] A página de detalhe é uma só (exemplo: `detalhe-projeto.html?id=joao-saccucci-labs`) e funciona para qualquer projeto do JSON.
- [ ] Mostra nome, descrição, status, datas e tecnologias do projeto.
- [ ] Para cada agente que participou, mostra: nome/papel, resumo (1 a 2 frases), entregáveis (links para os arquivos produzidos) e imagens (prints).
- [ ] Se a lista de imagens ou de entregáveis estiver vazia, o bloco fica escondido ou mostra "Sem itens ainda", sem deixar espaço quebrado.
- [ ] Um `id` que não existe mostra "Projeto não encontrado" com um link de volta para a lista.

**US04: Equipe**
Como visitante, quero conhecer cada agente da empresa, para entender o papel de cada um e em quais projetos trabalhou.
- [ ] A página lista os 4 agentes a partir de `data/agentes.json`.
- [ ] Cada perfil mostra avatar SVG, nome, papel, descrição curta e a cor própria do agente.
- [ ] Cada perfil lista os projetos em que o agente trabalhou. Essa lista é calculada a partir de `projetos.json`, não digitada à mão.
- [ ] Cada projeto listado tem um link para o detalhe dele.

### Etapa 2

**US05: Linha do tempo do projeto**
Como visitante, quero ver a sequência do que aconteceu em cada projeto, para entender o processo de trabalho e não só o resultado.
- [x] A página de detalhe do projeto mostra uma linha do tempo com os eventos em ordem de data.
- [x] Cada evento mostra data, agente responsável (com a cor dele) e a descrição.
- [x] Os eventos vêm do campo `linhaDoTempo` do projeto no JSON.
- [x] No celular, a linha do tempo aparece na vertical e continua legível.

**US06: Sobre mim**
Como recrutador, quero conhecer o João, o chefe da empresa, para saber quem ele é e como entrar em contato.
- [x] A página mostra uma frase de apresentação, o que o João estuda e os links de GitHub, LinkedIn e e-mail.
- [x] Os textos ficam como placeholder (exemplo: "[Sua frase aqui]") até o João enviar as informações.
- [x] Os links de GitHub e LinkedIn abrem em nova aba, e o de e-mail usa `mailto:`.

### Etapa 3 — Tela de leitura das aulas

**Contexto.** Hoje o professor escreve as aulas em Markdown (`aulas/aula-01.md`, `aulas/aula-02.md`) e o site só mostra um link para o arquivo `.md` cru. A Etapa 3 cria uma lista de aulas e uma tela de leitura confortável para estudar. O professor continua escrevendo `.md`, e as aulas precisam continuar legíveis no GitHub.

**Páginas novas (sugestão de nomes; o dev pode ajustar)**
- `aulas.html`: lista de todas as aulas.
- `aula.html?id=<id-da-aula>`: tela de leitura, uma página só para todas as aulas (mesmo padrão de `detalhe-projeto.html?id=...`). Exemplo: `aula.html?id=joao-saccucci-labs-aula-01`.
- O `#` da URL fica reservado para as seções da aula (sumário), por exemplo `aula.html?id=joao-saccucci-labs-aula-01#2-os-5-conceitos`.
- Não usar URLs "bonitas" como `/aulas/aula-01` (precisariam de configuração de servidor que o GitHub Pages não tem).

**Sintaxe do Markdown das aulas (compatível com o GitHub)**

| Recurso | Como o professor escreve | No GitHub aparece como | No site aparece como |
|---|---|---|---|
| Caixa Dica | `> [!TIP]` | caixa "Tip" | caixa "Dica" |
| Caixa Erro comum | `> [!CAUTION]` | caixa "Caution" | caixa "Erro comum" |
| Caixa Em entrevista | `> [!IMPORTANT]` | caixa "Important" | caixa "Em entrevista" |
| Caixa Palavra nova | `> [!NOTE]` | caixa "Note" | caixa "Palavra nova" |
| Termo do glossário | `[[fetch]]` | o texto `[[fetch]]` (legível) | palavra marcada com tradução |
| Item do exercício | `- [ ] Criar o arquivo...` | checkbox (lista de tarefas) | checkbox marcável e salvo |

Exemplo de caixa:
```markdown
> [!TIP]
> Use o Live Server para testar o fetch no computador.
```

**US07: Item "Aulas" no menu e lista de aulas**
Como João (aluno), quero uma página com todas as aulas, para encontrar rápido o que estudar e ver o que já terminei.
- [x] O menu de **todas** as páginas tem o item "Aulas", que leva para `aulas.html`. Nas páginas `aulas.html` e `aula.html`, o item "Aulas" aparece como ativo.
- [x] A lista é gerada a partir de `data/aulas.json`. Nenhuma aula fica escrita direto no HTML.
- [x] Mostra as aulas de todos os projetos, ordenadas por projeto e depois por `numero`. Cada item mostra número, título, nome do projeto, tempo de leitura e resumo. *(Na Etapa 4, a ordem e o agrupamento passam a seguir a US18.)*
- [x] Aulas marcadas como concluídas (US15) mostram um ✓ e o texto "Concluída" (não só a cor ou o ícone, para leitores de tela).
- [x] Clicar em uma aula abre `aula.html?id=<id>`.
- [x] Uma aula nova adicionada ao JSON aparece na lista sem mudar HTML ou JS.
- [x] Se o JSON não carregar, aparece uma mensagem de erro amigável.

**US08: Abrir a aula pelo detalhe do projeto**
Como visitante, quero que o link de uma aula no detalhe do projeto abra a tela de leitura, para não cair no arquivo `.md` cru.
- [x] Os entregáveis do professor em `data/projetos.json` passam a apontar para `aula.html?id=<id>` (e não mais para `aulas/aula-NN.md`).
- [x] Clicar em "Aula 01" ou "Aula 02" no detalhe do projeto abre a tela de leitura da aula certa.
- [x] `aula.html` com `id` inexistente ou sem `id` mostra "Aula não encontrada" com um link para `aulas.html`.

**US09: Tela de leitura em "modo foco"**
Como João, quero ler a aula em uma tela calma e confortável, para me concentrar no conteúdo.
- [x] A tela busca o arquivo `.md` indicado em `aulas.json` e mostra o conteúdo convertido em HTML com `marked`.
- [x] O topo mostra título, número da aula, projeto e tempo de leitura, vindos de `aulas.json`.
- [x] Visual "modo foco": mesma identidade do site (tema escuro, cores dos agentes, fontes), mas **sem partículas e sem grade** no fundo, com uma coluna de texto de largura confortável (cerca de 65 a 75 caracteres por linha) e letra maior que nas outras páginas.
- [x] Tabelas largas e blocos de código longos rolam na horizontal **dentro do próprio bloco**; a página inteira nunca rola na horizontal a 360px.
- [x] Links relativos dentro da aula (ex.: `css/style.css`) funcionam a partir de `aula.html`.
- [x] Se o `.md` não carregar, aparece uma mensagem de erro amigável.
- [x] Se a biblioteca `marked` não carregar (CDN fora do ar), aparece uma mensagem amigável com um link para o arquivo `.md` original.
- [x] Há um link "Voltar para as aulas" e, quando existirem, links para a aula anterior e a próxima do mesmo projeto.

**US10: Sumário e barra de progresso**
Como João, quero ver as seções da aula e quanto já li, para me localizar e pular direto para o que preciso.
- [x] O sumário é gerado automaticamente a partir dos títulos `##` e `###` da aula (os `###` aparecem recuados).
- [x] Cada título da aula ganha um `id`, e clicar no item do sumário rola até a seção e atualiza o `#` da URL. Abrir a URL com `#` já leva para a seção.
- [x] O item da seção que está sendo lida fica destacado e muda conforme a rolagem.
- [x] No desktop, o sumário fica na lateral e acompanha a rolagem. No celular, fica escondido atrás de um botão "Sumário"; tocar em um item fecha o sumário, e a tecla Esc também fecha.
- [x] Uma barra fina no topo mostra o progresso de leitura (0% no início do texto, 100% no fim) e acompanha a rolagem.
- [x] Com `prefers-reduced-motion`, a rolagem até a seção é instantânea (sem animação).

**US11: Código colorido e botão Copiar**
Como João, quero o código com cores e um botão para copiar, para entender melhor e testar no VS Code.
- [x] Blocos de código com linguagem (` ```js `, ` ```html `, ` ```css `, ` ```json `) aparecem coloridos com `highlight.js`. Blocos sem linguagem aparecem sem cor, com a mesma fonte mono.
- [x] Cada bloco tem um botão "Copiar" que copia o código exato (sem o texto do botão).
- [x] Depois de copiar, o botão mostra "Copiado!" por cerca de 2 segundos e o aviso também é lido por leitores de tela.
- [x] Se a cópia falhar (navegador sem permissão), o botão mostra "Não foi possível copiar" em vez de fingir sucesso.
- [x] Se `highlight.js` não carregar, o código continua aparecendo, só que sem cores.
- [x] As cores do código têm contraste AA nos dois temas (escuro e papel).

**US12: Caixas de destaque**
Como João, quero dicas, erros comuns, perguntas de entrevista e palavras novas destacadas, para achar rápido o que é mais importante.
- [x] As 4 caixas da tabela de sintaxe aparecem com cor, ícone e título próprios: Dica, Erro comum, Em entrevista, Palavra nova.
- [x] O tipo da caixa é indicado também pelo título em texto (não só pela cor ou ícone). O ícone é decorativo para leitores de tela.
- [x] Um blockquote comum (sem `[!...]`) continua aparecendo como citação normal.
- [ ] O mesmo `.md` aparece como caixa de alerta quando aberto no GitHub.

**US13: Glossário de palavras em inglês**
Como João, quero ver a tradução de palavras em inglês do código, para aprender o vocabulário sem sair da aula.
- [x] As traduções ficam em `data/glossario.json`, um arquivo só, reutilizado por todas as aulas.
- [x] Um termo escrito como `[[fetch]]` no `.md` aparece no site como `fetch`, com um estilo de "palavra marcada" (por exemplo, sublinhado pontilhado).
- [x] Ao passar o mouse, focar com Tab ou tocar na palavra, aparece um balão com a tradução e a explicação curta. Esc ou tocar fora fecha o balão. Só um balão fica aberto por vez.
- [x] A busca do termo ignora maiúsculas e minúsculas.
- [x] `[[...]]` dentro de código (`` `assim` `` ou em bloco) **não** é convertido.
- [x] Termo que não existe no glossário aparece como texto normal, sem balão e sem quebrar a página.
- [x] Se `glossario.json` não carregar, a aula aparece normalmente, com os termos como texto simples.

**US14: Exercício com checklist salvo**
Como João, quero marcar os passos do exercício que já fiz, para continuar de onde parei depois.
- [x] Os itens `- [ ]` da aula viram checkboxes que podem ser marcados com mouse, toque e teclado (cada um com o texto do item como rótulo).
- [x] O estado de cada checkbox fica salvo por aula e continua igual depois de recarregar a página ou fechar o navegador.
- [x] Itens escritos como `- [x]` no `.md` começam marcados só se o João nunca tiver mexido nesse checklist.
- [x] Há um botão "Limpar exercício" que desmarca todos os itens daquela aula.

*(Na Etapa 4 o checklist continua funcionando, mas passa a ser opcional e secundário: o formato principal de prática vira o exemplo executável e o quiz.)*

**US15: Marcar aula como concluída**
Como João, quero marcar uma aula como concluída, para acompanhar meu progresso na lista de aulas.
- [x] No fim da aula há o botão "Marcar aula como concluída". Depois de clicado, ele muda para "Aula concluída ✓" e permite desfazer ("Desmarcar").
- [x] O botão informa o estado para leitores de tela (por exemplo, `aria-pressed`).
- [x] O estado fica salvo e aparece na lista de aulas (US07) ao voltar para ela.
- [x] Marcar a aula como concluída **não** depende de o checklist estar completo.

**US16: Tamanho da letra e tema "papel"**
Como João, quero ajustar o tamanho da letra e trocar para um tema claro, para ler com conforto em qualquer lugar.
- [x] Os botões A− e A+ diminuem e aumentam o texto da aula em passos (sugestão: 5 tamanhos). No menor e no maior tamanho, o botão correspondente fica desativado.
- [x] Os botões têm rótulo acessível ("Diminuir letra" e "Aumentar letra").
- [x] Um botão alterna entre o tema escuro (padrão) e o tema claro "papel" (fundo creme, texto escuro). O botão informa o estado para leitores de tela.
- [x] Tamanho de letra e tema ficam salvos e valem para todas as aulas.
- [x] O tema claro existe **só** na tela de aula. As outras páginas continuam sempre escuras.
- [x] O tema salvo é aplicado antes de a aula aparecer, sem "piscar" o tema escuro ao abrir a página.
- [x] Texto, caixas, links, código, sumário e balões do glossário têm contraste AA nos dois temas.

**US17: Reescrever as Aulas 01 e 02 no novo formato** (tarefa do professor) — **substituída pela US24 na Etapa 4**
Como João, quero as aulas que já existem no formato novo, para usar todas as funções da tela de leitura.
- [ ] As Aulas 01 e 02 usam os 4 tipos de caixa onde fizer sentido, marcam termos em inglês com `[[...]]` e trazem o exercício como checklist `- [ ]`.
- [ ] Todo termo marcado com `[[...]]` existe em `data/glossario.json`.
- [ ] Na Aula 02, a Parte A do exercício (preencher a página Sobre) é removida, porque o João já fez, e substituída por uma nova atividade escolhida pelo professor sobre o conteúdo da Etapa 2.
- [ ] As duas aulas continuam legíveis abrindo o `.md` no GitHub.
- [x] `data/aulas.json` tem as duas aulas cadastradas.

**Requisitos gerais da Etapa 3**
- [x] Todo o progresso (checklist, aula concluída, tamanho da letra e tema) fica salvo no `localStorage` do navegador de quem lê. Cada pessoa vê só o próprio progresso.
- [x] Se o `localStorage` estiver indisponível (modo anônimo restrito, bloqueado ou cheio), todas as funções continuam funcionando na página, só não salvam. Nenhum erro quebra a página.
- [x] As chaves do `localStorage` usam um prefixo do site para não misturar com outros sites (sugestão: `jsl:`).
- [x] `marked` e `highlight.js` vêm de CDN com versão fixa na URL (nada de "latest"). Só `aula.html` carrega essas bibliotecas.
- [x] Tudo funciona a 360px, por teclado (foco visível em todos os controles) e respeita `prefers-reduced-motion`.
- [ ] Funciona publicado no GitHub Pages, com caminhos relativos.

### Etapa 4 — Aulas 2.0

**Contexto.** O João achou as aulas atuais "robustas demais": 15 minutos, cerca de 5 conceitos por aula, tudo explicado a partir do código pronto do site. Ficou a sensação de que ele nunca faria algo igual. A Etapa 4 troca o formato: aulas curtas, **um conceito por aula**, com resumo no topo, um exemplo pequeno e pronto explicado linha por linha, botão para rodar e editar o exemplo, e um quiz opcional. O João **não** quer construir um mini-site guiado.

**O que muda e o que continua**
- As 3 aulas atuais (`aulas/aula-01.md` a `aula-03.md`) são **substituídas** pelas novas e apagadas do site. Elas continuam no histórico do Git.
- Tudo da tela de leitura da Etapa 3 continua valendo: sumário, barra de progresso, glossário, caixas, Copiar, A−/A+, tema papel, aula concluída, anterior/próxima.
- O checklist `- [ ]` continua funcionando, mas é opcional (no máximo uma pequena seção "Para praticar").
- Progresso salvo das aulas antigas é ignorado (as novas aulas usam `id` novos, então nada antigo aparece misturado).

**Estrutura padrão de uma aula (guia para o professor)**
1. `# Título` (o conceito, em linguagem simples).
2. Caixa **Em resumo** (até 3 linhas).
3. `## O conceito`: explicação curta e tranquila.
4. `## Exemplo`: um código pequeno (até 15 linhas), independente do código do site, seguido da explicação linha por linha. Pode haver um segundo exemplo, se ajudar.
5. `## Onde aparece no site` (opcional): 1 a 3 frases citando o arquivo do site em que o conceito é usado. Sem colar o código inteiro do site.
6. `## Teste rápido` (opcional): 1 a 3 perguntas de quiz.
7. `## Para praticar` (opcional): checklist com no máximo 3 itens.

**Sintaxe nova do Markdown (compatível com o GitHub)**

| Recurso | Como o professor escreve | No GitHub aparece como | No site aparece como |
|---|---|---|---|
| Em resumo | `> [!TIP]` e, na linha seguinte, `> **Em resumo:** texto...` | caixa "Tip" com "Em resumo:" em negrito | caixa própria "Em resumo" (diferente da Dica) |
| Exemplo executável (HTML/CSS/JS) | bloco ` ```html rodar ` (CSS vai dentro de `<style>`, JS dentro de `<script>`) | código HTML colorido | código com linhas numeradas + botões Rodar, Editar, Restaurar, Copiar |
| Exemplo executável (só JS) | bloco ` ```js rodar ` | código JS colorido | igual ao anterior; o resultado é a saída do console |
| Explicação linha por linha | lista logo depois do bloco: `- **L3:** texto` ou `- **L3–5:** texto` | lista normal | bloco "Linha por linha" ligado ao exemplo |
| Quiz | bloco ` ```quiz ` (formato abaixo) | bloco de texto simples, legível | pergunta com alternativas clicáveis e explicação |

Exemplos:

````markdown
> [!TIP]
> **Em resumo:** `querySelector` encontra um elemento da página.
> Depois você pode mudar o texto ou o estilo dele pelo JavaScript.

```html rodar
<p id="msg">Olá</p>
<script>
  const p = document.querySelector('#msg');
  p.textContent = 'Olá, João!';
  console.log(p.textContent);
</script>
```
- **L1:** um parágrafo com o `id` "msg".
- **L3:** procura na página o elemento com `id="msg"` e guarda na constante `p`.
- **L4–5:** troca o texto e mostra o novo texto no console.

```quiz
? O que document.querySelector('#msg') devolve?
[ ] Todos os elementos com a classe msg.
    -> Errada: o # procura por id; classe seria .msg, e para vários use querySelectorAll.
[x] O primeiro elemento com id="msg".
    -> Certa: o # indica id, e querySelector devolve só o primeiro que encontrar.
[ ] O texto "msg".
    -> Errada: ele devolve o elemento, não um texto.
```
````

**Regras do bloco `quiz`**
- Um bloco = uma pergunta. Várias perguntas = vários blocos.
- Linha que começa com `?` = pergunta (exatamente uma, e ela vem primeiro).
- Linhas que começam com `[ ]` ou `[x]` = alternativas, de 2 a 5, com **exatamente uma** `[x]`.
- Linha que começa com `->` (pode ter espaços antes) = explicação da alternativa logo acima. Toda alternativa precisa de explicação.
- Linhas em branco são ignoradas. As alternativas aparecem na ordem escrita (sem embaralhar).

**Bloco malformado (regra geral)**
- Quiz fora das regras acima: aparece como bloco de código comum, com o texto original, e a aula continua normal. O site registra o motivo com `console.warn` (para o professor/dev achar o erro).
- ` ```css rodar ` ou qualquer linguagem diferente de `html`/`js` com `rodar`: aparece como bloco de código comum, sem botão Rodar.
- Lista `**Lnn:**` que não vem logo depois de um bloco de código, ou que cita uma linha que não existe: aparece como lista normal.
- "Em resumo" com mais de 3 linhas aparece do mesmo jeito (o limite é regra de escrita, não validação do site).

**US18: Aulas organizadas em módulos**
Como João, quero ver as aulas agrupadas por módulo, para estudar em pequenos passos e saber em que parte do site cada conceito foi usado.
- [ ] `data/aulas.json` segue o modelo da Etapa 4 (seção 3), com a lista de módulos e o campo `modulo` em cada aula.
- [ ] `aulas.html` agrupa as aulas por projeto e, dentro dele, por módulo, em ordem de `modulos[].numero` e depois de `aulas[].numero`.
- [ ] Cada módulo aparece com título próprio (ex.: "Módulo 1 — Etapa 1: o básico do site") e o progresso em texto (ex.: "2 de 5 concluídas").
- [ ] Cada módulo tem um `id` na página, então `aulas.html#<id do módulo>` leva direto a ele.
- [ ] Cada aula mostra número no formato "Aula 1.2" (módulo.aula), título, tempo de leitura, resumo e o estado "Concluída" (como na US07).
- [ ] O topo de `aula.html` mostra o módulo, o número "Aula 1.2" e o tempo de leitura.
- [ ] Anterior/próxima seguem a ordem módulo → aula e atravessam módulos (a última aula do Módulo 1 leva à primeira do Módulo 2).
- [ ] Um módulo sem aulas não aparece na lista. Uma aula com `modulo` inexistente aparece num grupo "Outras aulas" no fim, sem quebrar a página.
- [ ] Os entregáveis do professor em `data/projetos.json` passam a ser um link por módulo, apontando para `aulas.html#<id do módulo>`.

**US19: Caixa "Em resumo"**
Como João, quero um resumo curto no começo de cada aula, para saber o essencial antes de ler e para revisar depois.
- [ ] Um `> [!TIP]` cujo conteúdo começa com `**Em resumo:**` aparece como caixa "Em resumo", com título em texto, visual próprio e diferente da caixa Dica.
- [ ] O texto "Em resumo:" em negrito não aparece repetido dentro da caixa (vira o título).
- [ ] Um `> [!TIP]` comum continua aparecendo como "Dica".
- [ ] No GitHub, a caixa aparece como alerta "Tip" com "Em resumo:" em negrito.
- [ ] A caixa tem contraste AA nos dois temas.

**US20: Exemplo com linhas numeradas e explicação linha por linha**
Como João, quero ver um exemplo pequeno com as linhas numeradas e uma explicação de cada linha, para entender o conceito sem precisar ler o código inteiro do site.
- [ ] Todo bloco de código com linguagem mostra o número de cada linha à esquerda.
- [ ] Os números não são copiados pelo botão Copiar nem ao selecionar o texto, e são ignorados por leitores de tela.
- [ ] Uma lista com itens no formato `- **L3:**` ou `- **L3–5:**` (também aceita `L3-5`) logo depois de um bloco de código aparece como bloco "Linha por linha", visualmente ligado ao exemplo.
- [ ] No bloco "Linha por linha", cada item mostra o rótulo em texto ("Linha 3", "Linhas 3 a 5") e a explicação.
- [ ] A 360px, linhas longas rolam dentro do bloco de código e os números de linha continuam alinhados com o código.

**US21: Botão "▶ Rodar" com resultado na aula**
Como João, quero rodar o exemplo e ver o resultado dentro da aula, para ligar o código ao que ele faz na tela.
- [ ] Blocos ` ```html rodar ` e ` ```js rodar ` ganham o botão "▶ Rodar" (com rótulo acessível "Rodar exemplo").
- [ ] Ao clicar, aparece abaixo do bloco uma área "Resultado" e/ou "Console".
  - `html rodar`: mostra a página renderizada e, se houver `console.log`, também o Console.
  - `js rodar`: mostra só o Console.
- [ ] O Console mostra `console.log`, `console.warn` e `console.error` em ordem, com texto (objetos e listas aparecem em formato legível, como JSON). Se nada for exibido, mostra "(nada foi exibido no console)".
- [ ] Erros do código aparecem no Console como "Erro: <mensagem>" (com a linha, quando o navegador informar), identificados por texto e não só pela cor. A aula não quebra.
- [ ] O resultado roda num `iframe` com `sandbox="allow-scripts"` (sem `allow-same-origin`, sem `allow-forms`, `allow-popups` ou `allow-top-navigation`), com o código passado por `srcdoc`.
- [ ] O código do exemplo não consegue ler nem alterar a página da aula nem o `localStorage` do site. A página recebe as mensagens do console por `postMessage` e só aceita mensagens vindas do próprio `iframe` do exemplo.
- [ ] O exemplo não acessa a rede (sem `fetch`, imagens externas etc.), por uma regra de CSP dentro do `srcdoc`.
- [ ] A área "Resultado" tem fundo branco nos dois temas (como uma página em branco do navegador), altura máxima definida e rolagem interna. Nunca causa rolagem horizontal na página a 360px.
- [ ] Clicar em "Rodar" de novo recomeça o exemplo do zero (não acumula a saída anterior).
- [ ] Ao terminar de rodar, um aviso curto é lido por leitores de tela (`aria-live="polite"`), por exemplo "Exemplo executado. 2 linhas no console." O foco do teclado não pula sozinho.
- [ ] Com `prefers-reduced-motion`, a área de resultado aparece sem animação.

**US22: Editar o exemplo e restaurar o original**
Como João, quero mudar o código do exemplo e rodar de novo, para testar o que acontece sem medo de estragar.
- [ ] Blocos com Rodar têm o botão "Editar", que troca o código por uma caixa de texto editável com o mesmo conteúdo.
- [ ] "Rodar" usa sempre o código que está na caixa (o editado, se houver).
- [ ] O botão "Restaurar" volta o código ao original da aula e limpa o resultado. Ele só fica ativo quando o código foi alterado.
- [ ] No modo edição, Copiar copia o código editado.
- [ ] A caixa de texto tem rótulo acessível ("Código do exemplo, editável"), fonte mono e tamanho de letra de pelo menos 16px no celular (para o celular não dar zoom sozinho).
- [ ] A tecla Tab **não** fica presa na caixa: ela leva ao próximo controle, como em qualquer campo. Uma dica curta abaixo da caixa avisa para usar espaços para recuar o código.
- [ ] Funciona no celular a 360px (digitar, rodar e restaurar).
- [ ] O código editado **não** é salvo: ao recarregar a página, o exemplo volta ao original.

**US23: Quiz opcional com explicação**
Como João, quero responder perguntas rápidas e ver na hora por que cada alternativa está certa ou errada, para conferir se entendi.
- [ ] Cada bloco ` ```quiz ` válido aparece como pergunta com alternativas clicáveis (botões), na ordem escrita.
- [ ] Ao escolher uma alternativa, o quiz mostra na hora "Certa!" ou "Errada", em texto e não só com cor ou ícone.
- [ ] Depois de responder, as alternativas ficam travadas, a certa é indicada e aparece a explicação de **todas** as alternativas.
- [ ] O botão "Tentar de novo" limpa a resposta daquela pergunta.
- [ ] O resultado é anunciado por leitores de tela com `aria-live="polite"` (ex.: "Errada. A resposta certa é: O primeiro elemento com id msg.").
- [ ] Dá para responder só com o teclado (Tab até a alternativa, Enter ou Espaço para escolher), com foco visível.
- [ ] A resposta dada fica salva por aula (ver seção 3) e aparece de novo ao voltar para a aula. Se o `localStorage` estiver indisponível, o quiz funciona igual, só não salva.
- [ ] O quiz **não** conta para "Aula concluída" e não tem nota nem pontuação.
- [ ] Contraste AA nos dois temas para alternativas, estados certa/errada e explicações.

**US24: Novas aulas curtas** (tarefa do professor)
Como João, quero aulas curtas sobre um conceito por vez, cobrindo o que foi feito nas Etapas 1 a 3, para aprender com calma e sentir que consigo fazer igual.
- [ ] Entre 12 e 15 aulas, divididas em 3 módulos: Módulo 1 (Etapa 1: o básico do site), Módulo 2 (Etapa 2) e Módulo 3 (Etapa 3: tela de leitura).
- [ ] Cada aula trata de **um** conceito, com `tempoLeitura` de 5 a 7 minutos (até cerca de 1.000 palavras, contando o texto).
- [ ] Cada aula segue a estrutura padrão acima: Em resumo (até 3 linhas), O conceito, Exemplo com explicação linha por linha.
- [ ] Cada exemplo tem no máximo 15 linhas, é independente do código do site e roda sozinho.
- [ ] Os exemplos em que ver o resultado ajuda usam `rodar`. Exemplos que dependem de `fetch`, `localStorage` ou arquivos do site **não** usam `rodar` (no sandbox eles não funcionam); nesses casos o professor mostra o resultado esperado em texto.
- [ ] Pelo menos metade das aulas tem um Teste rápido (quiz) com 1 a 3 perguntas.
- [ ] Conteúdo mais complexo aparece pouco e sempre marcado como opcional (ex.: numa caixa Dica "Para ir além").
- [ ] Todo termo marcado com `[[...]]` existe em `data/glossario.json`.
- [ ] Todas as aulas continuam legíveis abrindo o `.md` no GitHub.
- [ ] As aulas antigas (`aulas/aula-01.md` a `aula-03.md`) são removidas do site e de `data/aulas.json`.
- [ ] `data/aulas.json` e os entregáveis do professor em `data/projetos.json` estão atualizados.

**Requisitos gerais da Etapa 4**
- [ ] Nenhum bloco malformado quebra a aula (ver regra acima). Os outros blocos da mesma aula continuam funcionando.
- [ ] Se `marked` ou `highlight.js` não carregarem, valem os comportamentos da Etapa 3. Rodar, Editar e Quiz não dependem de `highlight.js`.
- [ ] Nenhuma biblioteca nova: Rodar, Editar, linhas numeradas e Quiz são feitos em JS puro.
- [ ] Tudo funciona a 360px sem rolagem horizontal, por teclado (foco visível em Rodar, Editar, Restaurar, Copiar e alternativas do quiz), com contraste AA nos dois temas e respeitando `prefers-reduced-motion`.
- [ ] Os botões têm texto visível; o "▶" é decorativo para leitores de tela.
- [ ] Funciona publicado no GitHub Pages, com caminhos relativos.

### Requisitos gerais (todas as etapas)
- [ ] O layout funciona de 360px até telas de desktop.
- [ ] As animações são suaves e respeitam `prefers-reduced-motion`.
- [ ] O contraste do texto é legível sobre o fundo escuro, e as imagens têm texto `alt`.
- [ ] O site funciona publicado no GitHub Pages, com caminhos relativos.

---

## 3. Modelo de dados

### `data/agentes.json`
```json
[
  {
    "id": "product-owner",
    "nome": "Product Owner",
    "papel": "Levanta requisitos, escreve user stories e prioriza o MVP.",
    "cor": "#00E5FF",
    "avatar": "img/agentes/product-owner.svg"
  },
  { "id": "artista", "nome": "Artista", "papel": "Define cores, tipografia e layout.", "cor": "#B026FF", "avatar": "img/agentes/artista.svg" },
  { "id": "dev", "nome": "Dev", "papel": "Implementa o que foi definido.", "cor": "#FF2BD6", "avatar": "img/agentes/dev.svg" },
  { "id": "professor", "nome": "Professor", "papel": "Explica o código e propõe exercícios.", "cor": "#7CFFB2", "avatar": "img/agentes/professor.svg" }
]
```
As cores acima são sugestões. O artista define as finais.

### `data/projetos.json` (dados iniciais reais)
```json
[
  {
    "id": "joao-saccucci-labs",
    "nome": "João Saccucci Labs",
    "descricao": "Site da própria empresa: painel de projetos e futuro portfólio.",
    "status": "em andamento",
    "dataInicio": "2026-11-02",
    "dataFim": null,
    "tecnologias": ["HTML", "CSS", "JavaScript"],
    "trabalhos": [
      {
        "agente": "product-owner",
        "resumo": "Fez 8 perguntas ao João para entender a ideia e documentou os requisitos, as user stories e a priorização.",
        "entregaveis": [
          { "titulo": "Requisitos", "url": "docs/requisitos.md" }
        ],
        "imagens": []
      }
    ],
    "linhaDoTempo": [
      { "data": "2026-11-02", "agente": "product-owner", "descricao": "Entrevista com o João (8 perguntas)." },
      { "data": "2026-11-02", "agente": "product-owner", "descricao": "Requisitos documentados em docs/requisitos.md." }
    ]
  }
]
```
**Regras dos campos**
- `status`: "planejado", "em andamento" ou "concluído".
- `trabalhos[].agente` e `linhaDoTempo[].agente` precisam ter o mesmo valor de um `id` em `agentes.json`.
- `imagens`: lista de `{ "src": "...", "alt": "..." }`. Pode ficar vazia.
- `entregaveis[].url`: caminho relativo do arquivo produzido. Se o arquivo precisar ser acessível pelo site publicado, ele deve estar dentro da pasta do site.
- O campo `linhaDoTempo` já entra nos dados na Etapa 1, mas só aparece na tela na Etapa 2.
- **A partir da Etapa 3:** entregáveis que são aulas usam `aula.html?id=<id da aula>` como `url`. Exemplo: `{ "titulo": "Aula 01", "url": "aula.html?id=joao-saccucci-labs-aula-01" }`.
- **A partir da Etapa 4:** os entregáveis do professor são um link por módulo. Exemplo: `{ "titulo": "Aulas — Módulo 1", "url": "aulas.html#joao-saccucci-labs-m1" }`.

### `data/aulas.json` (Etapa 3 — substituído na Etapa 4)
```json
[
  {
    "id": "joao-saccucci-labs-aula-01",
    "titulo": "Como HTML, JS, fetch e JSON se conectam",
    "projeto": "joao-saccucci-labs",
    "numero": 1,
    "arquivo": "aulas/aula-01.md",
    "tempoLeitura": 15,
    "resumo": "O caminho dos dados do JSON até a tela, os 5 conceitos principais da Etapa 1 e por que usar o Live Server."
  }
]
```
**Regras dos campos**
- `id`: único em todo o site (não só no projeto). Formato: `<id do projeto>-aula-<NN>`. Só letras minúsculas, números e hífen.
- `projeto`: mesmo valor de um `id` em `projetos.json`. A lista de aulas usa esse campo para mostrar o nome do projeto.
- `numero`: número da aula dentro do projeto (define a ordem e a aula anterior/próxima).
- `arquivo`: caminho relativo do `.md`, dentro da pasta do site.
- `tempoLeitura`: minutos (número inteiro), informado pelo professor.
- `resumo`: 1 a 2 frases.

### `data/aulas.json` (Etapa 4 — modelo atual)
O arquivo deixa de ser uma lista e passa a ser um objeto com `modulos` e `aulas`. Continua um arquivo só (um `fetch` só).
```json
{
  "modulos": [
    {
      "id": "joao-saccucci-labs-m1",
      "projeto": "joao-saccucci-labs",
      "numero": 1,
      "titulo": "Etapa 1: o básico do site",
      "resumo": "HTML, CSS e como o JavaScript lê um JSON e monta a página."
    }
  ],
  "aulas": [
    {
      "id": "joao-saccucci-labs-m1-aula-02",
      "titulo": "Encontrar um elemento com querySelector",
      "modulo": "joao-saccucci-labs-m1",
      "numero": 2,
      "arquivo": "aulas/modulo-1/aula-02.md",
      "tempoLeitura": 6,
      "resumo": "Como o JavaScript acha um elemento da página para mudar o texto dele."
    }
  ]
}
```
**Regras dos campos**
- `modulos[].id`: único no site. Formato: `<id do projeto>-m<N>`. Também é a âncora em `aulas.html#<id>`.
- `modulos[].projeto`: mesmo valor de um `id` em `projetos.json`.
- `modulos[].numero`: ordem do módulo dentro do projeto. A tela mostra "Módulo <numero> — <titulo>".
- `modulos[].resumo`: opcional, 1 frase.
- `aulas[].id`: único no site. Formato: `<id do módulo>-aula-<NN>`. Só letras minúsculas, números e hífen. Por ser um formato novo, o progresso das aulas antigas não se mistura com as novas.
- `aulas[].modulo`: mesmo valor de um `modulos[].id`. O projeto da aula vem do módulo (o campo `projeto` sai das aulas).
- `aulas[].numero`: número da aula **dentro do módulo**. A tela mostra "Aula <módulo>.<numero>", ex.: "Aula 1.2".
- `aulas[].arquivo`: caminho relativo do `.md`, no formato `aulas/modulo-<N>/aula-<NN>.md`.
- `aulas[].tempoLeitura`: minutos (inteiro), de 5 a 7.
- `aulas[].resumo`: 1 frase.

### `data/glossario.json` (Etapa 3)
```json
[
  { "termo": "fetch", "traducao": "buscar", "explicacao": "Função do JavaScript que busca um arquivo ou endereço e devolve a resposta." },
  { "termo": "callback", "traducao": "função de retorno", "explicacao": "Função passada para outra função, para ser chamada depois." },
  { "termo": "deploy", "traducao": "publicação", "explicacao": "Colocar o site no ar, por exemplo no GitHub Pages." }
]
```
**Regras dos campos**
- `termo`: palavra como aparece dentro de `[[...]]` na aula. Comparação sem diferenciar maiúsculas e minúsculas. Não pode haver termo repetido.
- `traducao`: tradução curta em português.
- `explicacao`: opcional, uma frase.

### Progresso no `localStorage` (sugestão de chaves)
| Chave | Valor |
|---|---|
| `jsl:aulas-concluidas` | lista de `id` de aulas concluídas, ex.: `["joao-saccucci-labs-m1-aula-02"]` |
| `jsl:checklist:<id da aula>` | lista de verdadeiro/falso na ordem dos itens, ex.: `[true, false, true]` |
| `jsl:quiz:<id da aula>` | (Etapa 4) lista com o índice da alternativa escolhida em cada quiz, na ordem dos quizzes da aula; `null` para não respondido. Ex.: `[1, null]` |
| `jsl:leitura-fonte` | nível do tamanho da letra, ex.: `3` |
| `jsl:leitura-tema` | `"escuro"` ou `"papel"` |

Observação: o checklist e o quiz são salvos pela ordem dos itens. Se o professor mudar a ordem ou a quantidade de itens ou perguntas de uma aula, as marcações antigas daquela aula podem ficar desalinhadas. Isso é aceito. Um índice salvo que não existe mais (ex.: alternativa 4 numa pergunta com 3) é ignorado. Chaves das aulas antigas podem ficar no navegador sem efeito; não é preciso apagá-las.

---

## 4. Priorização

| Etapa | Itens |
|---|---|
| **Etapa 1 (MVP)** | US01 Início, US02 Lista de projetos, US03 Detalhe do projeto, US04 Equipe, além dos requisitos gerais e dos arquivos JSON com o projeto nº 1 |
| **Etapa 2** | US05 Linha do tempo e US06 Sobre mim (com placeholders) |
| **Etapa 3** | US07 Lista de aulas e item no menu, US08 Link pelo detalhe do projeto, US09 Tela de leitura (modo foco), US10 Sumário e progresso, US11 Código colorido e Copiar, US12 Caixas de destaque, US13 Glossário, US14 Checklist do exercício, US15 Aula concluída, US16 Letra e tema papel, US17 Reescrita das Aulas 01 e 02 (substituída pela US24), além dos requisitos gerais da Etapa 3 |
| **Etapa 4 — essencial** | US18 Módulos, US19 Em resumo, US20 Linhas numeradas e linha por linha, US21 Rodar, US24 Novas aulas, além dos requisitos gerais da Etapa 4 |
| **Etapa 4 — logo em seguida** | US22 Editar e Restaurar, US23 Quiz |

Ordem sugerida dentro da Etapa 1: JSON → Lista de projetos → Detalhe → Equipe → Início.

Ordem sugerida dentro da Etapa 3: `aulas.json` e `glossario.json` → US09 Tela de leitura → US07 e US08 → US11 e US12 → US10 → US14 e US15 → US16 → US13. Em paralelo, o professor faz a US17 seguindo a tabela de sintaxe acima, para o dev já testar com as aulas reais.

Ordem sugerida dentro da Etapa 4: o professor escreve primeiro **2 aulas-piloto** (uma com `html rodar` e quiz, outra com `js rodar`) e o novo `aulas.json` → dev faz US18 → US19 → US20 → US21 → US22 → US23 → o João lê as aulas-piloto e aprova o formato → o professor escreve as demais aulas (US24) → as aulas antigas são removidas.

---

## 5. Fora do escopo
- Back-end, banco de dados, login ou painel para editar dados pelo navegador. A edição é feita direto nos arquivos JSON e `.md`.
- Projetos fictícios ou de exemplo. Só entram projetos reais.
- Frameworks ou bibliotecas (React, Tailwind, etc.) e etapas de build. **Única exceção:** `marked` e `highlight.js` por CDN, só na tela de aula. Editor de código pronto (CodeMirror, Monaco etc.) também fica de fora.
- Formulário de contato, blog e versão em outros idiomas.
- Modo claro no site. **Exceção:** o tema claro "papel" existe só na tela de leitura das aulas (`aula.html`).
- Busca e filtros de projetos (podem entrar em uma etapa futura, quando houver vários projetos).
- Busca dentro das aulas, filtros na lista de aulas e comentários.
- Quiz com nota, pontuação, ranking, tempo limite, alternativas embaralhadas ou perguntas abertas (de digitar). O quiz também não conta para "Aula concluída".
- Mini-site ou projeto guiado construído passo a passo nas aulas.
- Editor com cores, autocompletar ou recuo automático; salvar o código editado; desfazer além do "Restaurar".
- Rodar exemplos que usam rede (`fetch`), `localStorage` ou arquivos do site; rodar outras linguagens além de HTML, CSS e JavaScript; parar automaticamente um código que trava (laço infinito). Se o João travar a aba editando, basta recarregar a página.
- Destacar a linha do código ao passar o mouse no item da explicação linha por linha (pode entrar depois).
- Recuperar o progresso das aulas antigas nas novas.
- Sincronizar o progresso entre aparelhos ou navegadores (o progresso fica só no navegador de quem lê).
- Glossário em página própria ou glossário escrito dentro do `.md` da aula.
