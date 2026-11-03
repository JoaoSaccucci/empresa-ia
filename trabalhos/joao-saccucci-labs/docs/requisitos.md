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
- [ ] O menu de **todas** as páginas tem o item "Aulas", que leva para `aulas.html`. Nas páginas `aulas.html` e `aula.html`, o item "Aulas" aparece como ativo.
- [ ] A lista é gerada a partir de `data/aulas.json`. Nenhuma aula fica escrita direto no HTML.
- [ ] Mostra as aulas de todos os projetos, ordenadas por projeto e depois por `numero`. Cada item mostra número, título, nome do projeto, tempo de leitura e resumo.
- [ ] Aulas marcadas como concluídas (US15) mostram um ✓ e o texto "Concluída" (não só a cor ou o ícone, para leitores de tela).
- [ ] Clicar em uma aula abre `aula.html?id=<id>`.
- [ ] Uma aula nova adicionada ao JSON aparece na lista sem mudar HTML ou JS.
- [ ] Se o JSON não carregar, aparece uma mensagem de erro amigável.

**US08: Abrir a aula pelo detalhe do projeto**
Como visitante, quero que o link de uma aula no detalhe do projeto abra a tela de leitura, para não cair no arquivo `.md` cru.
- [ ] Os entregáveis do professor em `data/projetos.json` passam a apontar para `aula.html?id=<id>` (e não mais para `aulas/aula-NN.md`).
- [ ] Clicar em "Aula 01" ou "Aula 02" no detalhe do projeto abre a tela de leitura da aula certa.
- [ ] `aula.html` com `id` inexistente ou sem `id` mostra "Aula não encontrada" com um link para `aulas.html`.

**US09: Tela de leitura em "modo foco"**
Como João, quero ler a aula em uma tela calma e confortável, para me concentrar no conteúdo.
- [ ] A tela busca o arquivo `.md` indicado em `aulas.json` e mostra o conteúdo convertido em HTML com `marked`.
- [ ] O topo mostra título, número da aula, projeto e tempo de leitura, vindos de `aulas.json`.
- [ ] Visual "modo foco": mesma identidade do site (tema escuro, cores dos agentes, fontes), mas **sem partículas e sem grade** no fundo, com uma coluna de texto de largura confortável (cerca de 65 a 75 caracteres por linha) e letra maior que nas outras páginas.
- [ ] Tabelas largas e blocos de código longos rolam na horizontal **dentro do próprio bloco**; a página inteira nunca rola na horizontal a 360px.
- [ ] Links relativos dentro da aula (ex.: `css/style.css`) funcionam a partir de `aula.html`.
- [ ] Se o `.md` não carregar, aparece uma mensagem de erro amigável.
- [ ] Se a biblioteca `marked` não carregar (CDN fora do ar), aparece uma mensagem amigável com um link para o arquivo `.md` original.
- [ ] Há um link "Voltar para as aulas" e, quando existirem, links para a aula anterior e a próxima do mesmo projeto.

**US10: Sumário e barra de progresso**
Como João, quero ver as seções da aula e quanto já li, para me localizar e pular direto para o que preciso.
- [ ] O sumário é gerado automaticamente a partir dos títulos `##` e `###` da aula (os `###` aparecem recuados).
- [ ] Cada título da aula ganha um `id`, e clicar no item do sumário rola até a seção e atualiza o `#` da URL. Abrir a URL com `#` já leva para a seção.
- [ ] O item da seção que está sendo lida fica destacado e muda conforme a rolagem.
- [ ] No desktop, o sumário fica na lateral e acompanha a rolagem. No celular, fica escondido atrás de um botão "Sumário"; tocar em um item fecha o sumário, e a tecla Esc também fecha.
- [ ] Uma barra fina no topo mostra o progresso de leitura (0% no início do texto, 100% no fim) e acompanha a rolagem.
- [ ] Com `prefers-reduced-motion`, a rolagem até a seção é instantânea (sem animação).

**US11: Código colorido e botão Copiar**
Como João, quero o código com cores e um botão para copiar, para entender melhor e testar no VS Code.
- [ ] Blocos de código com linguagem (` ```js `, ` ```html `, ` ```css `, ` ```json `) aparecem coloridos com `highlight.js`. Blocos sem linguagem aparecem sem cor, com a mesma fonte mono.
- [ ] Cada bloco tem um botão "Copiar" que copia o código exato (sem o texto do botão).
- [ ] Depois de copiar, o botão mostra "Copiado!" por cerca de 2 segundos e o aviso também é lido por leitores de tela.
- [ ] Se a cópia falhar (navegador sem permissão), o botão mostra "Não foi possível copiar" em vez de fingir sucesso.
- [ ] Se `highlight.js` não carregar, o código continua aparecendo, só que sem cores.
- [ ] As cores do código têm contraste AA nos dois temas (escuro e papel).

**US12: Caixas de destaque**
Como João, quero dicas, erros comuns, perguntas de entrevista e palavras novas destacadas, para achar rápido o que é mais importante.
- [ ] As 4 caixas da tabela de sintaxe aparecem com cor, ícone e título próprios: Dica, Erro comum, Em entrevista, Palavra nova.
- [ ] O tipo da caixa é indicado também pelo título em texto (não só pela cor ou ícone). O ícone é decorativo para leitores de tela.
- [ ] Um blockquote comum (sem `[!...]`) continua aparecendo como citação normal.
- [ ] O mesmo `.md` aparece como caixa de alerta quando aberto no GitHub.

**US13: Glossário de palavras em inglês**
Como João, quero ver a tradução de palavras em inglês do código, para aprender o vocabulário sem sair da aula.
- [ ] As traduções ficam em `data/glossario.json`, um arquivo só, reutilizado por todas as aulas.
- [ ] Um termo escrito como `[[fetch]]` no `.md` aparece no site como `fetch`, com um estilo de "palavra marcada" (por exemplo, sublinhado pontilhado).
- [ ] Ao passar o mouse, focar com Tab ou tocar na palavra, aparece um balão com a tradução e a explicação curta. Esc ou tocar fora fecha o balão. Só um balão fica aberto por vez.
- [ ] A busca do termo ignora maiúsculas e minúsculas.
- [ ] `[[...]]` dentro de código (`` `assim` `` ou em bloco) **não** é convertido.
- [ ] Termo que não existe no glossário aparece como texto normal, sem balão e sem quebrar a página.
- [ ] Se `glossario.json` não carregar, a aula aparece normalmente, com os termos como texto simples.

**US14: Exercício com checklist salvo**
Como João, quero marcar os passos do exercício que já fiz, para continuar de onde parei depois.
- [ ] Os itens `- [ ]` da aula viram checkboxes que podem ser marcados com mouse, toque e teclado (cada um com o texto do item como rótulo).
- [ ] O estado de cada checkbox fica salvo por aula e continua igual depois de recarregar a página ou fechar o navegador.
- [ ] Itens escritos como `- [x]` no `.md` começam marcados só se o João nunca tiver mexido nesse checklist.
- [ ] Há um botão "Limpar exercício" que desmarca todos os itens daquela aula.

**US15: Marcar aula como concluída**
Como João, quero marcar uma aula como concluída, para acompanhar meu progresso na lista de aulas.
- [ ] No fim da aula há o botão "Marcar aula como concluída". Depois de clicado, ele muda para "Aula concluída ✓" e permite desfazer ("Desmarcar").
- [ ] O botão informa o estado para leitores de tela (por exemplo, `aria-pressed`).
- [ ] O estado fica salvo e aparece na lista de aulas (US07) ao voltar para ela.
- [ ] Marcar a aula como concluída **não** depende de o checklist estar completo.

**US16: Tamanho da letra e tema "papel"**
Como João, quero ajustar o tamanho da letra e trocar para um tema claro, para ler com conforto em qualquer lugar.
- [ ] Os botões A− e A+ diminuem e aumentam o texto da aula em passos (sugestão: 5 tamanhos). No menor e no maior tamanho, o botão correspondente fica desativado.
- [ ] Os botões têm rótulo acessível ("Diminuir letra" e "Aumentar letra").
- [ ] Um botão alterna entre o tema escuro (padrão) e o tema claro "papel" (fundo creme, texto escuro). O botão informa o estado para leitores de tela.
- [ ] Tamanho de letra e tema ficam salvos e valem para todas as aulas.
- [ ] O tema claro existe **só** na tela de aula. As outras páginas continuam sempre escuras.
- [ ] O tema salvo é aplicado antes de a aula aparecer, sem "piscar" o tema escuro ao abrir a página.
- [ ] Texto, caixas, links, código, sumário e balões do glossário têm contraste AA nos dois temas.

**US17: Reescrever as Aulas 01 e 02 no novo formato** (tarefa do professor)
Como João, quero as aulas que já existem no formato novo, para usar todas as funções da tela de leitura.
- [ ] As Aulas 01 e 02 usam os 4 tipos de caixa onde fizer sentido, marcam termos em inglês com `[[...]]` e trazem o exercício como checklist `- [ ]`.
- [ ] Todo termo marcado com `[[...]]` existe em `data/glossario.json`.
- [ ] Na Aula 02, a Parte A do exercício (preencher a página Sobre) é removida, porque o João já fez, e substituída por uma nova atividade escolhida pelo professor sobre o conteúdo da Etapa 2.
- [ ] As duas aulas continuam legíveis abrindo o `.md` no GitHub.
- [ ] `data/aulas.json` tem as duas aulas cadastradas.

**Requisitos gerais da Etapa 3**
- [ ] Todo o progresso (checklist, aula concluída, tamanho da letra e tema) fica salvo no `localStorage` do navegador de quem lê. Cada pessoa vê só o próprio progresso.
- [ ] Se o `localStorage` estiver indisponível (modo anônimo restrito, bloqueado ou cheio), todas as funções continuam funcionando na página, só não salvam. Nenhum erro quebra a página.
- [ ] As chaves do `localStorage` usam um prefixo do site para não misturar com outros sites (sugestão: `jsl:`).
- [ ] `marked` e `highlight.js` vêm de CDN com versão fixa na URL (nada de "latest"). Só `aula.html` carrega essas bibliotecas.
- [ ] Tudo funciona a 360px, por teclado (foco visível em todos os controles) e respeita `prefers-reduced-motion`.
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

### `data/aulas.json` (Etapa 3)
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
  },
  {
    "id": "joao-saccucci-labs-aula-02",
    "titulo": "Linha do tempo, página Sobre e truques de CSS",
    "projeto": "joao-saccucci-labs",
    "numero": 2,
    "arquivo": "aulas/aula-02.md",
    "tempoLeitura": 15,
    "resumo": "Ordenar e agrupar eventos, ordem dos scripts, HTML acessível e subgrid."
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
| `jsl:aulas-concluidas` | lista de `id` de aulas concluídas, ex.: `["joao-saccucci-labs-aula-01"]` |
| `jsl:checklist:<id da aula>` | lista de verdadeiro/falso na ordem dos itens, ex.: `[true, false, true]` |
| `jsl:leitura-fonte` | nível do tamanho da letra, ex.: `3` |
| `jsl:leitura-tema` | `"escuro"` ou `"papel"` |

Observação: o checklist é salvo pela ordem dos itens. Se o professor mudar a ordem ou a quantidade de itens de uma aula, as marcações antigas daquela aula podem ficar desalinhadas. Isso é aceito.

---

## 4. Priorização

| Etapa | Itens |
|---|---|
| **Etapa 1 (MVP)** | US01 Início, US02 Lista de projetos, US03 Detalhe do projeto, US04 Equipe, além dos requisitos gerais e dos arquivos JSON com o projeto nº 1 |
| **Etapa 2** | US05 Linha do tempo e US06 Sobre mim (com placeholders) |
| **Etapa 3** | US07 Lista de aulas e item no menu, US08 Link pelo detalhe do projeto, US09 Tela de leitura (modo foco), US10 Sumário e progresso, US11 Código colorido e Copiar, US12 Caixas de destaque, US13 Glossário, US14 Checklist do exercício, US15 Aula concluída, US16 Letra e tema papel, US17 Reescrita das Aulas 01 e 02, além dos requisitos gerais da Etapa 3 |

Ordem sugerida dentro da Etapa 1: JSON → Lista de projetos → Detalhe → Equipe → Início.

Ordem sugerida dentro da Etapa 3: `aulas.json` e `glossario.json` → US09 Tela de leitura → US07 e US08 → US11 e US12 → US10 → US14 e US15 → US16 → US13. Em paralelo, o professor faz a US17 seguindo a tabela de sintaxe acima, para o dev já testar com as aulas reais.

---

## 5. Fora do escopo
- Back-end, banco de dados, login ou painel para editar dados pelo navegador. A edição é feita direto nos arquivos JSON e `.md`.
- Projetos fictícios ou de exemplo. Só entram projetos reais.
- Frameworks ou bibliotecas (React, Tailwind, etc.) e etapas de build. **Única exceção:** `marked` e `highlight.js` por CDN, só na tela de aula.
- Formulário de contato, blog e versão em outros idiomas.
- Modo claro no site. **Exceção:** o tema claro "papel" existe só na tela de leitura das aulas (`aula.html`).
- Busca e filtros de projetos (podem entrar em uma etapa futura, quando houver vários projetos).
- Busca dentro das aulas, filtros na lista de aulas, comentários e quiz com correção automática.
- Sincronizar o progresso entre aparelhos ou navegadores (o progresso fica só no navegador de quem lê).
- Glossário em página própria ou glossário escrito dentro do `.md` da aula.
